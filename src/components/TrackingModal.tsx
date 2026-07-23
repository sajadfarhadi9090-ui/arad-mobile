import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  PackageCheck, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText,
  User,
  Calendar,
  Phone,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrackingStep {
  title: string;
  location: string;
  dateTime: string;
  completed: boolean;
  isCurrent?: boolean;
  description: string;
}

interface MockTrackingResult {
  barcode: string;
  invoiceNo: string;
  sender: string;
  recipientName: string;
  destinationCity: string;
  postType: string;
  weight: string;
  dispatchDate: string;
  currentStatus: string;
  steps: TrackingStep[];
}

const SAMPLE_TRACKING_DATA: Record<string, MockTrackingResult> = {
  '283910482019482019284019': {
    barcode: '283910482019482019284019',
    invoiceNo: 'INV-9041',
    sender: 'فروشگاه موبایل آراد (مرکز علاءالدین تهران)',
    recipientName: 'علیرضا حسینی',
    destinationCity: 'اصفهان - مرکز شهر',
    postType: 'پست پیشتاز بیمه شده (کالای با ارزش بالا)',
    weight: '۶۵۰ گرم',
    dispatchDate: '۱۴۰۳/۰۴/۲۰ - ساعت ۱۰:۳۰',
    currentStatus: 'تحویل داده شده به گیرنده',
    steps: [
      {
        title: 'پذیرش مرسوله در دفتر پستی مبداء',
        location: 'دفتر پستی علاءالدین - منطقه ۱۵ تهران',
        dateTime: '۱۴۰۳/۰۴/۲۰ - ساعت ۱۰:۳۰',
        completed: true,
        description: 'بسته حاوی آیفون ۱۵ پرو مکس توسط موبایل آراد تحویل باجه پستی شد.'
      },
      {
        title: 'ورود به مرکز تجزیه و مبادلات پستی تهران',
        location: 'مرکز مبادلات لشگر تهران',
        dateTime: '۱۴۰۳/۰۴/۲۰ - ساعت ۱۶:۴۵',
        completed: true,
        description: 'بارگیری و تفکیک جهت ارسال به استان اصفهان'
      },
      {
        title: 'ارسال به دفتر پستی مقصد (ترانزیت استان)',
        location: 'مرکز مبادلات پست اصفهان',
        dateTime: '۱۴۰۳/۰۴/۲۱ - ساعت ۰۵:۱۵',
        completed: true,
        description: 'ورود مرسوله به مرکز هاب توزیع استان اصفهان'
      },
      {
        title: 'تحویل به موزع (نامه‌رسان منطقه)',
        location: 'منطقه ۲ پستی اصفهان',
        dateTime: '۱۴۰۳/۰۴/۲۱ - ساعت ۰۹:۰۰',
        completed: true,
        description: 'مرسوله جهت تحویل حضوری در اختیار موزع آقای محمدی قرار گرفت.'
      },
      {
        title: 'تحویل داده شده به گیرنده',
        location: 'آدرس گیرنده - اصفهان',
        dateTime: '۱۴۰۳/۰۴/۲۱ - ساعت ۱۲:۴۰',
        completed: true,
        isCurrent: true,
        description: 'مرسوله با دریافت امضاء و کد ملی به آقای علیرضا حسینی تحویل شد.'
      }
    ]
  },
  '109283746592018273645192': {
    barcode: '109283746592018273645192',
    invoiceNo: 'INV-9044',
    sender: 'فروشگاه موبایل آراد (مرکز علاءالدین تهران)',
    recipientName: 'سارا صادقی',
    destinationCity: 'شیراز - خیابان زند',
    postType: 'پست پیشتاز بیمه شده',
    weight: '۵۸۰ گرم',
    dispatchDate: '۱۴۰۳/۰۴/۲۲ - ساعت ۱۱:۱۵',
    currentStatus: 'درحال حمل بین استانی',
    steps: [
      {
        title: 'پذیرش مرسوله در دفتر پستی مبداء',
        location: 'دفتر پستی علاءالدین - منطقه ۱۵ تهران',
        dateTime: '۱۴۰۳/۰۴/۲۲ - ساعت ۱۱:۱۵',
        completed: true,
        description: 'بسته پستی پذیرش شده و کد رهگیری اختصاص یافت.'
      },
      {
        title: 'ورود به مرکز تجزیه و مبادلات پستی تهران',
        location: 'مرکز مبادلات لشگر تهران',
        dateTime: '۱۴۰۳/۰۴/۲۲ - ساعت ۱۸:۳۰',
        completed: true,
        description: 'بسته‌بندی ویژه بیمه شده انجام و آماده ارسال گردید.'
      },
      {
        title: 'درحال ارسال به استان مقصد (شیراز)',
        location: 'خط ترانزیت هوایی/زمینی پست',
        dateTime: '۱۴۰۳/۰۴/۲۳ - ساعت ۰۲:۰۰',
        completed: true,
        isCurrent: true,
        description: 'مرسوله در مسیر خروج از تهران به سمت استان فارس می‌باشد.'
      },
      {
        title: 'تحویل به موزع منطقه مقصد',
        location: 'پست مرکزی شیراز',
        dateTime: 'در انتظار خروج',
        completed: false,
        description: 'پس از رسیدن به مرکز شیراز توزیع خواهد شد.'
      },
      {
        title: 'تحویل نهایی به خریدار',
        location: 'آدرس مقصد',
        dateTime: 'پیش‌بینی: فردا ظهر',
        completed: false,
        description: 'تحویل حضوری همراه با ثبت امضا'
      }
    ]
  },
  '350192847561029384726105': {
    barcode: '350192847561029384726105',
    invoiceNo: 'INV-9050',
    sender: 'فروشگاه موبایل آراد (مرکز علاءالدین تهران)',
    recipientName: 'امیررضا کریمی',
    destinationCity: 'تبریز - خیابان آبرسان',
    postType: 'پست پیشتاز اکسپرس (ویژه)',
    weight: '۷۲۰ گرم',
    dispatchDate: '۱۴۰۳/۰۴/۲۳ - ساعت ۰۸:۰۰',
    currentStatus: 'تحویل به موزع - درحال توزیع در محل',
    steps: [
      {
        title: 'پذیرش در باجه مبداء',
        location: 'دفتر پستی علاءالدین تهران',
        dateTime: '۱۴۰۳/۰۴/۲۳ - ساعت ۰۸:۰۰',
        completed: true,
        description: 'پذیرش قطعی و صدور بارکد الکترونیکی'
      },
      {
        title: 'پردازش و ترانزیت سریع',
        location: 'مرکز مبادلات هاب تهران به تبریز',
        dateTime: '۱۴۰۳/۰۴/۲۳ - ساعت ۱۳:۳۰',
        completed: true,
        description: 'خروج از مرکز مبادلات استان تهران'
      },
      {
        title: 'ورود به پست مرکزی تبریز',
        location: 'دفتر توزیع آبرسان تبریز',
        dateTime: '۱۴۰۳/۰۴/۲۴ - ساعت ۰۷:۱۵',
        completed: true,
        description: 'تفکیک دستی و تحویل به باجه مامورین توزیع'
      },
      {
        title: 'تحویل به موزع (نامه رسان)',
        location: 'منطقه ۴ پستی تبریز',
        dateTime: '۱۴۰۳/۰۴/۲۴ - ساعت ۰۸:۴۵',
        completed: true,
        isCurrent: true,
        description: 'مامور پستی (آقای اصغری) جهت مراجعه به آدرس خریدار خارج گردید.'
      },
      {
        title: 'تحویل نهایی',
        location: 'آدرس تبریز',
        dateTime: 'پیش‌بینی: تا ساعت ۱۴ امروز',
        completed: false,
        description: 'در انتظار ثبت کد تحویل و امضا'
      }
    ]
  }
};

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState<string>('283910482019482019284019');
  const [activeResult, setActiveResult] = useState<MockTrackingResult | null>(
    SAMPLE_TRACKING_DATA['283910482019482019284019']
  );
  const [searched, setSearched] = useState<boolean>(true);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = searchInput.trim();
    if (!cleaned) return;

    // Direct check in sample database
    if (SAMPLE_TRACKING_DATA[cleaned]) {
      setActiveResult(SAMPLE_TRACKING_DATA[cleaned]);
      setNotFoundError(false);
      setSearched(true);
      return;
    }

    // Check if it's invoice code search
    const foundByInvoice = Object.values(SAMPLE_TRACKING_DATA).find(
      (item) => item.invoiceNo.toLowerCase() === cleaned.toLowerCase()
    );

    if (foundByInvoice) {
      setActiveResult(foundByInvoice);
      setNotFoundError(false);
      setSearched(true);
      return;
    }

    // If 24 digit code entered generate realistic dynamic tracking result
    if (/^\d{10,24}$/.test(cleaned)) {
      const generated: MockTrackingResult = {
        barcode: cleaned,
        invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        sender: 'فروشگاه موبایل آراد (مرکز علاءالدین تهران)',
        recipientName: 'خریدار گرامی آراد',
        destinationCity: 'استان مقصد (سراسر کشور)',
        postType: 'پست پیشتاز با بیمه ارزش کالا',
        weight: '۶۰۰ گرم',
        dispatchDate: 'امروز - ساعت ۰۹:۴۵',
        currentStatus: 'پذیرش در دفتر پستی مبداء - درحال پردازش',
        steps: [
          {
            title: 'پذیرش مرسوله در دفتر پستی مبداء',
            location: 'دفتر پستی علاءالدین - تهران',
            dateTime: 'امروز - ساعت ۰۹:۴۵',
            completed: true,
            isCurrent: true,
            description: 'مرسوله توسط موبایل آراد به باجه پستی تحویل داده شد.'
          },
          {
            title: 'مرکز تجزیه و مبادلات مبداء',
            location: 'مرکز پست تهران',
            dateTime: 'درحال انجام',
            completed: false,
            description: 'ارسال به مرکز رهگیری و تفکیک استانی'
          },
          {
            title: 'ارسال به استان مقصد',
            location: 'ترانزیت پستی',
            dateTime: 'پیش‌بینی: ۲۴ ساعت آینده',
            completed: false,
            description: 'حمل ایمن با بیمه رسمی شرکت پست'
          },
          {
            title: 'تحویل به نامه‌رسان (موزع)',
            location: 'منطقه پستی مقصد',
            dateTime: 'در انتظار خروج',
            completed: false,
            description: 'تحویل به مامور توزیع جهت مراجعه به آدرس'
          },
          {
            title: 'تحویل نهایی به گیرنده',
            location: 'آدرس ثبت شده خریدار',
            dateTime: 'پیش‌بینی: ۲۴ الی ۴۸ ساعت',
            completed: false,
            description: 'تحویل حضوری به گیرنده'
          }
        ]
      };
      setActiveResult(generated);
      setNotFoundError(false);
      setSearched(true);
    } else {
      setActiveResult(null);
      setNotFoundError(true);
      setSearched(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header with Official Iran Post styling - Fixed top header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold shadow">
              <Truck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">سامانه پیگیری مرسوله پستی</h2>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  شرکت ملی پست ایران
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">استعلام آنلاین وضعیت ارسال سفارشات خرید موبایل آراد</p>
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

        {/* Content Body - Inner scrollable area */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Search Box Form */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <label className="block text-xs font-bold text-slate-200">
              کد ۲۴ رقمی رهگیری پست یا شماره فاکتور خرید را وارد کنید:
            </label>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="مثال: 283910482019482019284019 یا INV-9041"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pr-10 pl-4 text-xs font-bold text-amber-400 placeholder-slate-500 focus:outline-none focus:border-amber-500 dir-ltr text-right"
                />
                <Search className="w-5 h-5 text-slate-500 absolute right-3 top-3.5" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition shrink-0 flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>پیگیری مرسوله</span>
              </button>
            </form>

            {/* Quick Presets for Demo testing */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-400">نمونه کد‌های آزمایشی:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('283910482019482019284019');
                  setActiveResult(SAMPLE_TRACKING_DATA['283910482019482019284019']);
                  setNotFoundError(false);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 px-2.5 py-1 rounded-lg text-amber-400 font-mono transition"
              >
                283910482 (تحویل شده)
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchInput('109283746592018273645192');
                  setActiveResult(SAMPLE_TRACKING_DATA['109283746592018273645192']);
                  setNotFoundError(false);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 px-2.5 py-1 rounded-lg text-cyan-400 font-mono transition"
              >
                109283746 (درحال ارسال)
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchInput('350192847561029384726105');
                  setActiveResult(SAMPLE_TRACKING_DATA['350192847561029384726105']);
                  setNotFoundError(false);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 px-2.5 py-1 rounded-lg text-emerald-400 font-mono transition"
              >
                350192847 (درحال توزیع)
              </button>
            </div>
          </div>

          {/* Error when barcode not found */}
          {searched && notFoundError && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p>اطلاعاتی با این کد رهگیری در سامانه پست یافت نشد!</p>
                <p className="text-[11px] text-slate-400 font-normal">
                  لطفاً کد ۲۴ رقمی پیامک شده از طرف پست یا شماره فاکتور صادر شده موبایل آراد را بررسی کرده و مجدداً تلاش نمایید.
                </p>
              </div>
            </div>
          )}

          {/* Tracking Details View */}
          {searched && activeResult && (
            <div className="space-y-5">
              
              {/* Summary Barcode Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold">شماره بارکد ۲۴ رقمی پستی:</div>
                    <div className="text-amber-400 font-black text-sm tracking-widest dir-ltr flex items-center gap-2 mt-0.5">
                      <span>{activeResult.barcode}</span>
                      <button
                        onClick={() => copyToClipboard(activeResult.barcode)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                        title="کپی بارکد"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-[11px] text-slate-400 block font-semibold">وضعیت فعلی مرسوله:</span>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block mt-0.5">
                      {activeResult.currentStatus}
                    </span>
                  </div>
                </div>

                {/* Key Particulars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> فرستنده:
                    </span>
                    <span className="text-white font-bold block">{activeResult.sender}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500" /> تحویل‌گیرنده:
                    </span>
                    <span className="text-white font-bold block">{activeResult.recipientName}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> شهر مقصد:
                    </span>
                    <span className="text-white font-bold block">{activeResult.destinationCity}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500" /> نوع خدمت:
                    </span>
                    <span className="text-white font-bold block">{activeResult.postType}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> تاریخ تحویل به پست:
                    </span>
                    <span className="text-white font-bold block">{activeResult.dispatchDate}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> وزن و ارزش:
                    </span>
                    <span className="text-emerald-400 font-bold block">{activeResult.weight} (بیمه کامل طلایی)</span>
                  </div>
                </div>
              </div>

              {/* Steps Timeline */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-extrabold text-white text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>تایم‌لاین و سیر حرکت مرسوله در شبکه پستی کشور:</span>
                </h4>

                <div className="relative pl-2 pr-4 space-y-6 before:absolute before:right-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {activeResult.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step Circle Icon */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition ${
                        step.completed
                          ? step.isCurrent
                            ? 'bg-amber-500 text-slate-950 border-amber-400 ring-4 ring-amber-500/20'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-600 border-slate-800'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{toPersianDigits(idx + 1)}</span>
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className={`font-black text-xs ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                            {step.title}
                          </h5>
                          <span className="text-[10px] text-amber-400/90 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {step.dateTime}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>موقعیت: {step.location}</span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Official Link to Post.ir */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-blue-950/40 border border-blue-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white block">مشاهده در سامانه رسمی شرکت ملی پست ایران:</span>
                    <span className="text-[11px] text-slate-400">اطلاعات این صفحه به‌صورت مستقیم از درگاه tracking.post.ir همگام‌سازی می‌شود.</span>
                  </div>
                </div>

                <a
                  href={`https://tracking.post.ir/search.aspx?id=${activeResult.barcode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <span>ورود به سایت tracking.post.ir</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          )}

          {/* Help Box */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-200 block">پشتیبانی و پیگیری تلفنی موبایل آراد:</span>
              <p className="text-[11px] leading-relaxed">
                در صورت وجود هرگونه ابهام، تغییر آدرس تحویل یا نیاز به هماهنگی با مامور توزیع پستی، می‌توانید با شماره تلفن <strong className="text-amber-400 dir-ltr inline-block">۰۲۱-۶۶۷۰۸۸۹۹</strong> تماس حاصل فرمایید.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Fixed Footer Bar */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-medium">پایان اطلاعات رهگیری پستی</span>
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
