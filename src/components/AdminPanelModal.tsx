import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  ShieldCheck, 
  Battery, 
  PlusCircle, 
  Check, 
  Lock, 
  KeyRound, 
  Upload, 
  Image as ImageIcon, 
  LogOut, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Smartphone,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  BarChart3,
  RotateCcw,
  Save,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { Product, PhoneCondition, PhoneBrand, UsedGrade } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProd: Product) => void;
  onUpdateProduct: (updatedProd: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const PRESET_GALLERY = [
  {
    name: 'آیفون تیتانیوم (15 Pro)',
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'سامسونگ پرچمدار (S24)',
    url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'شیائومی و اندروید',
    url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'آیفون استاندارد',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'گوگل پیکسل',
    url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop'
  }
];

// Sample Sales Records (آمار فروش)
interface SaleRecord {
  id: string;
  invoiceNo: string;
  customerName: string;
  phoneModel: string;
  brand: string;
  condition: 'new' | 'used';
  price: number;
  date: string;
  status: 'تحویل داده شده' | 'درحال ارسال' | 'در انتظار پرداخت';
}

const INITIAL_SALES: SaleRecord[] = [
  { id: 's-101', invoiceNo: 'INV-9041', customerName: 'علیرضا حسینی', phoneModel: 'iPhone 15 Pro Max 256GB', brand: 'Apple', condition: 'new', price: 68500000, date: '۱۴۰۳/۰۴/۲۱', status: 'تحویل داده شده' },
  { id: 's-102', invoiceNo: 'INV-9042', customerName: 'مریم رضایی', phoneModel: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', condition: 'new', price: 62000000, date: '۱۴۰۳/۰۴/۲۰', status: 'تحویل داده شده' },
  { id: 's-103', invoiceNo: 'INV-9043', customerName: 'محمد احمدی', phoneModel: 'iPhone 13 128GB Grade A+', brand: 'Apple', condition: 'used', price: 34500000, date: '۱۴۰۳/۰۴/۱۹', status: 'تحویل داده شده' },
  { id: 's-104', invoiceNo: 'INV-9044', customerName: 'سارا صادقی', phoneModel: 'Xiaomi 14 Pro 512GB', brand: 'Xiaomi', condition: 'new', price: 41000000, date: '۱۴۰۳/۰۴/۱۸', status: 'درحال ارسال' },
  { id: 's-105', invoiceNo: 'INV-9045', customerName: 'کامران امیری', phoneModel: 'iPhone 12 Pro 256GB Grade A', brand: 'Apple', condition: 'used', price: 29800000, date: '۱۴۰۳/۰۴/۱۶', status: 'تحویل داده شده' },
];

// Sample Purchase Records (آمار گوشی‌های خریداری شده از مردم / طرح تعویض)
interface PurchaseRecord {
  id: string;
  purchaseNo: string;
  sellerName: string;
  sellerPhone: string;
  phoneModel: string;
  brand: string;
  imei: string;
  purchasePrice: number;
  grade: 'A+' | 'A' | 'B';
  batteryHealth?: number;
  status: 'موجود در ویترین' | 'فروخته شده' | 'درحال تست و بازسازی';
  date: string;
}

const INITIAL_PURCHASES: PurchaseRecord[] = [
  { id: 'p-201', purchaseNo: 'PUR-3012', sellerName: 'رضا قاسمی', sellerPhone: '0912***4410', phoneModel: 'iPhone 13 Pro Max 256GB', brand: 'Apple', imei: '358291040591029', purchasePrice: 51000000, grade: 'A+', batteryHealth: 92, status: 'موجود در ویترین', date: '۱۴۰۳/۰۴/۲۲' },
  { id: 'p-202', purchaseNo: 'PUR-3013', sellerName: 'امیرحسین باقری', sellerPhone: '0935***8821', phoneModel: 'Samsung S22 Ultra 256GB', brand: 'Samsung', imei: '354002910395810', purchasePrice: 28500000, grade: 'A', status: 'موجود در ویترین', date: '۱۴۰۳/۰۴/۲۰' },
  { id: 'p-203', purchaseNo: 'PUR-3014', sellerName: 'فرشته طاهری', sellerPhone: '0919***1190', phoneModel: 'iPhone 12 128GB Blue', brand: 'Apple', imei: '352910492810394', purchasePrice: 22000000, grade: 'A+', batteryHealth: 88, status: 'فروخته شده', date: '۱۴۰۳/۰۴/۱۷' },
  { id: 'p-204', purchaseNo: 'PUR-3015', sellerName: 'مهدی کاظمی', sellerPhone: '0910***5533', phoneModel: 'Xiaomi 13T Pro 512GB', brand: 'Xiaomi', imei: '861039401928401', purchasePrice: 19500000, grade: 'A', status: 'موجود در ویترین', date: '۱۴۰۳/۰۴/۱۵' },
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  // Password Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Password Change State
  const [currentPass, setCurrentPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [passMessage, setPassMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Tab State
  const [tab, setTab] = useState<'list' | 'add' | 'edit' | 'sales_stats' | 'purchases_stats' | 'security'>('list');

  // Currently Editing Product
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Search filter inside inventory list
  const [inventorySearch, setInventorySearch] = useState<string>('');

  // Form state for Add/Edit
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [brand, setBrand] = useState<PhoneBrand>('apple');
  const [condition, setCondition] = useState<PhoneCondition>('new');
  const [price, setPrice] = useState<number>(35000000);
  const [imageUrl, setImageUrl] = useState('');
  const [storage, setStorage] = useState<'128GB' | '256GB' | '512GB' | '1TB'>('256GB');
  const [ram, setRam] = useState<'6GB' | '8GB' | '12GB' | '16GB'>('8GB');
  const [warranty, setWarranty] = useState('۷ روز مهلت تست آراد + گارانتی اصالت');
  
  // Inspection report fields for used phones
  const [batteryHealth, setBatteryHealth] = useState(92);
  const [cosmeticGrade, setCosmeticGrade] = useState<UsedGrade>('A+');
  const [cosmeticDesc, setCosmeticDesc] = useState('بسیار تمیز، در حد آکبند بدون خط و خش');

  // Stats State
  const [salesList, setSalesList] = useState<SaleRecord[]>(INITIAL_SALES);
  const [purchasesList, setPurchasesList] = useState<PurchaseRecord[]>(INITIAL_PURCHASES);

  // New sale registration modal state
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [newSaleCustomer, setNewSaleCustomer] = useState('');
  const [newSaleModel, setNewSaleModel] = useState('');
  const [newSalePrice, setNewSalePrice] = useState(30000000);

  // New purchase registration modal state
  const [showNewPurchaseModal, setShowNewPurchaseModal] = useState(false);
  const [newPurchSeller, setNewPurchSeller] = useState('');
  const [newPurchPhoneModel, setNewPurchPhoneModel] = useState('');
  const [newPurchPrice, setNewPurchPrice] = useState(25000000);
  const [newPurchGrade, setNewPurchGrade] = useState<'A+' | 'A' | 'B'>('A+');

  // Helper to get active admin password
  const getStoredPassword = (): string => {
    return localStorage.getItem('mobile_arad_admin_password') || 'arad123';
  };

  // Reset states when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setLoginPasswordInput('');
      setLoginError('');
      setPassMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = getStoredPassword();
    if (loginPasswordInput.trim() === activePass) {
      setIsAuthenticated(true);
      setLoginError('');
      setLoginPasswordInput('');
    } else {
      setLoginError('رمز عبور وارد شده اشتباه است!');
    }
  };

  // Handle Logout / Lock
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPasswordInput('');
    setTab('list');
    setEditingProductId(null);
  };

  // Handle Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = getStoredPassword();

    if (currentPass !== activePass) {
      setPassMessage({ text: 'رمز عبور فعلی اشتباه است!', isError: true });
      return;
    }

    if (newPass.length < 4) {
      setPassMessage({ text: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد.', isError: true });
      return;
    }

    if (newPass !== confirmPass) {
      setPassMessage({ text: 'رمز عبور جدید و تکرار آن یکسان نیستند.', isError: true });
      return;
    }

    localStorage.setItem('mobile_arad_admin_password', newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setPassMessage({ text: 'رمز عبور مدیریت با موفقیت تغییر کرد!', isError: false });
  };

  // Handle File Upload from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم تصویر نباید از ۵ مگابایت بیشتر باشد.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Populate form for Editing a product
  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setTitleFa(prod.titleFa);
    setTitleEn(prod.titleEn);
    setBrand(prod.brand);
    setCondition(prod.condition);
    setPrice(prod.price);
    setImageUrl(prod.images[0] || '');
    setStorage(prod.specs.storage as any || '256GB');
    setRam(prod.specs.ram as any || '8GB');
    setWarranty(prod.warranty || '۷ روز مهلت تست آراد');

    if (prod.inspectionReport) {
      setBatteryHealth(prod.inspectionReport.batteryHealth || 90);
      setCosmeticGrade(prod.inspectionReport.cosmeticGrade || 'A+');
      setCosmeticDesc(prod.inspectionReport.cosmeticDescription || '');
    }

    setTab('edit');
  };

  // Reset form
  const resetForm = () => {
    setEditingProductId(null);
    setTitleFa('');
    setTitleEn('');
    setBrand('apple');
    setCondition('new');
    setPrice(35000000);
    setImageUrl('');
    setStorage('256GB');
    setRam('8GB');
    setWarranty('۷ روز مهلت تست آراد + گارانتی اصالت');
    setBatteryHealth(92);
    setCosmeticGrade('A+');
    setCosmeticDesc('بسیار تمیز، در حد آکبند بدون خط و خش');
  };

  // Submit Add or Edit Product
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleFa) return;

    const finalImage = imageUrl || PRESET_GALLERY[0].url;

    if (editingProductId) {
      // Find existing product and update
      const existing = products.find(p => p.id === editingProductId);
      const updatedProd: Product = {
        ...existing!,
        id: editingProductId,
        titleFa,
        titleEn: titleEn || 'Smartphone',
        brand,
        condition,
        price,
        images: [finalImage],
        warranty: warranty || '۱۸ ماه گارانتی شرکتی + همتا',
        specs: {
          ...existing?.specs,
          screen: existing?.specs.screen || '6.7 اینچ AMOLED',
          processor: existing?.specs.processor || 'پردازنده هشت هسته‌ای',
          mainCamera: existing?.specs.mainCamera || '50 مگاپیکسل',
          selfieCamera: existing?.specs.selfieCamera || '12 مگاپیکسل',
          battery: existing?.specs.battery || '5000 میلی‌آمپر',
          storage,
          ram,
          color: existing?.specs.color || 'مشکی',
          colorHex: existing?.specs.colorHex || '#000000',
          weight: existing?.specs.weight || '200 گرم',
          os: existing?.specs.os || 'Android / iOS'
        },
        inspectionReport: condition === 'used' ? {
          batteryHealth,
          cosmeticGrade,
          cosmeticDescription: cosmeticDesc,
          screenOriginal: true,
          partsReplaced: 'قطعات کاملا فابریک و بدون بازشدگی',
          boxAndAccessories: 'جعبه اصلی + لوازم فابریک',
          imeiStatus: 'ثبت شده رسمی در همتا با کد انتقال آنی',
          inspectionScore: 96,
          inspectorName: 'کارشناس فنی موبایل آراد',
          inspectionDate: '۱۴۰۳/۰۴/۲۲'
        } : undefined
      };

      onUpdateProduct(updatedProd);
      alert('تغییرات محصول با موفقیت ذخیره شد!');
    } else {
      // Add New Product
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        titleFa,
        titleEn: titleEn || 'Smartphone',
        brand,
        condition,
        price,
        images: [finalImage],
        inStock: true,
        warranty: warranty || '۱۸ ماه گارانتی شرکتی + همتا',
        rating: 5.0,
        reviewsCount: 1,
        tags: [condition === 'used' ? 'کارکرده کارشناسی شده' : 'آکبند شرکتی'],
        createdAt: new Date().toISOString().split('T')[0],
        specs: {
          screen: '6.7 اینچ AMOLED 120Hz',
          processor: 'پردازنده اصلی هشت هسته‌ای',
          mainCamera: '50 مگاپیکسل اصلی',
          selfieCamera: '12 مگاپیکسل',
          battery: '5000 میلی‌آمپر ساعت',
          storage,
          ram,
          color: 'مشکی',
          colorHex: '#000000',
          weight: '200 گرم',
          os: 'Android / iOS'
        },
        inspectionReport: condition === 'used' ? {
          batteryHealth,
          cosmeticGrade,
          cosmeticDescription: cosmeticDesc,
          screenOriginal: true,
          partsReplaced: 'قطعات کاملا فابریک و بدون بازشدگی',
          boxAndAccessories: 'جعبه اصلی + لوازم فابریک',
          imeiStatus: 'ثبت شده رسمی در همتا با کد انتقال آنی',
          inspectionScore: 96,
          inspectorName: 'کارشناس فنی موبایل آراد',
          inspectionDate: '۱۴۰۳/۰۴/۲۲'
        } : undefined
      };

      onAddProduct(newProd);
      alert('محصول جدید با موفقیت به انبار موبایل آراد افزوده شد!');
    }

    resetForm();
    setTab('list');
  };

  // Add Manual Sale
  const handleAddManualSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSaleCustomer || !newSaleModel) return;

    const newSale: SaleRecord = {
      id: `s-${Date.now()}`,
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newSaleCustomer,
      phoneModel: newSaleModel,
      brand: 'سایر',
      condition: 'new',
      price: newSalePrice,
      date: 'امروز',
      status: 'تحویل داده شده'
    };

    setSalesList([newSale, ...salesList]);
    setNewSaleCustomer('');
    setNewSaleModel('');
    setShowNewSaleModal(false);
  };

  // Add Manual Purchase
  const handleAddManualPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPurchSeller || !newPurchPhoneModel) return;

    const newPurch: PurchaseRecord = {
      id: `p-${Date.now()}`,
      purchaseNo: `PUR-${Math.floor(1000 + Math.random() * 9000)}`,
      sellerName: newPurchSeller,
      sellerPhone: '0912***9900',
      phoneModel: newPurchPhoneModel,
      brand: 'کارکرده',
      imei: `35${Math.floor(1000000000000 + Math.random() * 9000000000000)}`,
      purchasePrice: newPurchPrice,
      grade: newPurchGrade,
      status: 'موجود در ویترین',
      date: 'امروز'
    };

    setPurchasesList([newPurch, ...purchasesList]);
    setNewPurchSeller('');
    setNewPurchPhoneModel('');
    setShowNewPurchaseModal(false);
  };

  // Computed Sales Statistics
  const totalSalesRevenue = salesList.reduce((acc, s) => acc + s.price, 0);
  const totalSalesCount = salesList.length;
  const avgSalePrice = totalSalesCount > 0 ? totalSalesRevenue / totalSalesCount : 0;

  // Computed Purchase Statistics
  const totalPurchaseExpenses = purchasesList.reduce((acc, p) => acc + p.purchasePrice, 0);
  const totalPurchaseCount = purchasesList.length;
  const avgPurchasePrice = totalPurchaseCount > 0 ? totalPurchaseExpenses / totalPurchaseCount : 0;

  // Inventory Filtered
  const filteredInventory = products.filter(p => {
    if (!inventorySearch) return true;
    const q = inventorySearch.toLowerCase();
    return p.titleFa.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header - Fixed Top */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">پنل اختصاصی مدیریت موبایل آراد</h2>
              <p className="text-xs text-slate-400">مدیریت انبار، ویرایش گوشی‌ها، آمار مجزای فروش و خریدهای کارکرده</p>
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

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition"
                title="خروج و قفل پنل"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج از مدیریت</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* IF NOT AUTHENTICATED: Show Password Login Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">ورود ایمن به پنل مدیریت</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                لطفا رمز عبور اختصاصی مدیریت فروشگاه موبایل آراد را وارد نمایید.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="رمز عبور مدیریت..."
                  value={loginPasswordInput}
                  onChange={(e) => setLoginPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pr-4 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 dir-ltr text-center font-bold tracking-widest"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {loginError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition"
              >
                تایید و ورود به پنل
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <>
            {/* Navigation Tabs Bar */}
            <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs overflow-x-auto no-scrollbar shrink-0 z-10">
              <button
                onClick={() => { resetForm(); setTab('list'); }}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
                  tab === 'list' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                موجود و ویرایش انبار ({toPersianDigits(products.length)})
              </button>

              <button
                onClick={() => { resetForm(); setTab('add'); }}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
                  tab === 'add' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                افزودن گوشی جدید
              </button>

              {tab === 'edit' && (
                <button
                  onClick={() => setTab('edit')}
                  className="px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 bg-amber-500 text-slate-950 shadow"
                >
                  <Edit2 className="w-4 h-4" />
                  ویرایش محصول انتخاب شده
                </button>
              )}

              <button
                onClick={() => setTab('sales_stats')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
                  tab === 'sales_stats' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                آمار فروش مجموعه
              </button>

              <button
                onClick={() => setTab('purchases_stats')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
                  tab === 'purchases_stats' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-blue-400" />
                آمار خرید از مردم (کارکرده)
              </button>

              <button
                onClick={() => setTab('security')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
                  tab === 'security' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                تغییر رمز عبور
              </button>
            </div>

            {/* Main Content Body - Scrollable flex area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: INVENTORY LIST & EDIT BUTTONS */}
              {tab === 'list' && (
                <div className="space-y-4">
                  
                  {/* Search Bar inside inventory */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="relative flex-1 min-w-[200px]">
                      <input
                        type="text"
                        placeholder="جستجو بر اساس نام گوشی، مدل یا برند..."
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <Search className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                    </div>

                    <div className="text-xs text-slate-400 font-semibold">
                      تعداد کالا: <span className="text-amber-400 font-bold">{toPersianDigits(filteredInventory.length)}</span>
                    </div>
                  </div>

                  {/* Product Cards Table List */}
                  <div className="grid grid-cols-1 divide-y divide-slate-800/80 text-xs bg-slate-950/40 rounded-2xl border border-slate-800 p-2">
                    {filteredInventory.map((p) => (
                      <div key={p.id} className="p-3 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-900/50 rounded-xl transition">
                        
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.titleFa} className="w-14 h-14 object-contain bg-slate-950 rounded-xl p-1.5 border border-slate-800" referrerPolicy="no-referrer" />
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-white text-sm">{p.titleFa}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                              <span className={`px-2 py-0.5 rounded-full font-bold ${
                                p.condition === 'used' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}>
                                {p.condition === 'used' ? 'کارکرده (دست دوم)' : 'آکبند (پلمپ)'}
                              </span>
                              <span>برند: <strong className="text-slate-200">{p.brand.toUpperCase()}</strong></span>
                              <span>حافظه: <strong className="text-slate-200">{p.specs.storage}</strong></span>
                              <span>رم: <strong className="text-slate-200">{p.specs.ram}</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-left ml-2">
                            <span className="text-amber-400 font-black text-base block dir-ltr">
                              {formatToman(p.price)}
                            </span>
                            <span className="text-[10px] text-slate-500">قیمت فروش انبار</span>
                          </div>

                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => startEditProduct(p)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 text-xs font-extrabold transition"
                            title="ویرایش عکس و مشخصات کالا"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>ویرایش کالا</span>
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => {
                              if (confirm(`آیا از حذف "${p.titleFa}" از موجودی انبار اطمینان دارید؟`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition"
                            title="حذف از انبار"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2 & 3: ADD NEW PRODUCT OR EDIT PRODUCT */}
              {(tab === 'add' || tab === 'edit') && (
                <form onSubmit={handleSubmitProduct} className="space-y-5 text-xs">
                  
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-amber-400 flex items-center gap-2">
                      {editingProductId ? <Edit2 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                      <span>{editingProductId ? `ویرایش گوشی: ${titleFa}` : 'افزودن گوشی جدید به انبار'}</span>
                    </h3>

                    <button
                      type="button"
                      onClick={() => { resetForm(); setTab('list'); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl border border-slate-700 transition text-xs"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>بازگشت به لیست انبار</span>
                    </button>
                  </div>

                  {/* Form Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">نام فارسی گوشی:</label>
                      <input
                        type="text"
                        placeholder="مثال: آیفون ۱۵ پرو مکس - ۲۵۶ گیگابایت"
                        required
                        value={titleFa}
                        onChange={(e) => setTitleFa(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">نام انگلیسی مدل:</label>
                      <input
                        type="text"
                        placeholder="e.g. iPhone 15 Pro Max 256GB"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">برند:</label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value as PhoneBrand)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                      >
                        <option value="apple">آیفون (Apple)</option>
                        <option value="samsung">سامسونگ (Samsung)</option>
                        <option value="xiaomi">شیائومی (Xiaomi)</option>
                        <option value="honor">آنر (Honor)</option>
                        <option value="google">گوگل پیکسل (Google)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">وضعیت دستگاه:</label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value as PhoneCondition)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                      >
                        <option value="new">نو (آکبند پلمپ)</option>
                        <option value="used">کارکرده (دست دوم کارشناسی شده)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">قیمت فروش (تومان):</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr text-right font-bold text-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">حافظه و رم:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={storage}
                          onChange={(e) => setStorage(e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold"
                        >
                          <option value="128GB">128 گیگابایت</option>
                          <option value="256GB">256 گیگابایت</option>
                          <option value="512GB">512 گیگابایت</option>
                          <option value="1TB">1 ترابایت</option>
                        </select>

                        <select
                          value={ram}
                          onChange={(e) => setRam(e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold"
                        >
                          <option value="6GB">6 گیگ رم</option>
                          <option value="8GB">8 گیگ رم</option>
                          <option value="12GB">12 گیگ رم</option>
                          <option value="16GB">16 گیگ رم</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD & SELECTION SECTION */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <ImageIcon className="w-4 h-4" />
                      <span>تغییر و آپلود تصویر محصول (از سیستم، لینک مستقیم یا گالری):</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      
                      {/* Left: Upload file or URL */}
                      <div className="md:col-span-8 space-y-3">
                        {/* Option 1: Upload from local file */}
                        <div className="border border-dashed border-slate-700 bg-slate-900/80 hover:border-amber-500 rounded-xl p-3 text-center transition cursor-pointer relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center gap-1.5 text-slate-300">
                            <Upload className="w-5 h-5 text-amber-400" />
                            <span className="font-bold text-xs">کلیک کنید یا عکس جدید را کشیده و اینجا رها کنید</span>
                            <span className="text-[10px] text-slate-500">پشتیبانی از فرمت‌های JPG, PNG, WEBP (حداکثر ۵ مگابایت)</span>
                          </div>
                        </div>

                        {/* Option 2: Direct URL Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] text-slate-400 font-semibold block">یا آدرس مستقیم اینترنتی عکس (URL):</label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr"
                          />
                        </div>

                        {/* Option 3: Quick Preset Gallery */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 font-semibold block">یا انتخاب از تصاویر آماده گوشی‌ها:</label>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {PRESET_GALLERY.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setImageUrl(item.url)}
                                className={`shrink-0 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border p-1.5 rounded-xl transition text-[11px] ${
                                  imageUrl === item.url ? 'border-amber-500 text-amber-400 font-bold' : 'border-slate-800 text-slate-300'
                                }`}
                              >
                                <img src={item.url} alt={item.name} className="w-6 h-6 object-contain rounded" />
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Preview */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-center space-y-2">
                        <span className="text-[11px] text-slate-400 font-bold">پیش‌نمایش زنده عکس:</span>
                        <div className="w-28 h-28 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden p-1">
                          {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="text-slate-600 text-[10px] flex flex-col items-center gap-1">
                              <ImageIcon className="w-6 h-6 stroke-1" />
                              <span>تصویری انتخاب نشده</span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Used phone parameters */}
                  {condition === 'used' && (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-3">
                      <h4 className="font-extrabold text-amber-400">اطلاعات کارشناسی ۶۰‌گانه (مخصوص گوشی کارکرده):</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {brand === 'apple' && (
                          <div>
                            <label className="text-slate-300 block mb-1 font-semibold">سلامت باتری (٪ مخصوص آیفون):</label>
                            <input
                              type="number"
                              min="50"
                              max="100"
                              value={batteryHealth}
                              onChange={(e) => setBatteryHealth(Number(e.target.value))}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-slate-300 block mb-1 font-semibold">درجه ظاهری (Grade):</label>
                          <select
                            value={cosmeticGrade}
                            onChange={(e) => setCosmeticGrade(e.target.value as UsedGrade)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-bold"
                          >
                            <option value="A+">Grade A+ (در حد آکبند بدون خط)</option>
                            <option value="A">Grade A (خیلی تمیز با خط مویی)</option>
                            <option value="B">Grade B (معمولی)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-300 block mb-1 font-semibold">توضیحات ظاهری کارشناس:</label>
                        <input
                          type="text"
                          value={cosmeticDesc}
                          onChange={(e) => setCosmeticDesc(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                  >
                    {editingProductId ? <Save className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
                    <span>{editingProductId ? 'ذخیره تغییرات محصول' : 'ثبت و اضافه کردن محصول به انبار آراد'}</span>
                  </button>
                </form>
              )}

              {/* TAB 4: SALES STATISTICS (آمار فروش مجموعه) */}
              {tab === 'sales_stats' && (
                <div className="space-y-6">
                  
                  {/* Top Header & Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span>آمار و تراکنش‌های فروش مجموعه موبایل آراد</span>
                      </h3>
                      <p className="text-xs text-slate-400">گزارش مالی و فروش کالاها به‌صورت مجزا</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTab('list')}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-700"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>بازگشت به انبار</span>
                      </button>

                      <button
                        onClick={() => setShowNewSaleModal(true)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        ثبت فاکتور فروش جدید
                      </button>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>ارزش کل فروش:</span>
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-emerald-400 font-black text-lg dir-ltr text-right">
                        {formatToman(totalSalesRevenue)}
                      </div>
                      <div className="text-[10px] text-slate-500">حاصل از تمامی سفارشات فروش</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>تعداد کل گوشی‌های فروخته‌شده:</span>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-white font-black text-lg">
                        {toPersianDigits(totalSalesCount)} <span className="text-xs font-normal text-slate-400">دستگاه</span>
                      </div>
                      <div className="text-[10px] text-slate-500">نو آکبند و کارکرده</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>میانگین مبلغ هر فاکتور:</span>
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-blue-400 font-black text-lg dir-ltr text-right">
                        {formatToman(Math.round(avgSalePrice))}
                      </div>
                      <div className="text-[10px] text-slate-500">میانگین تراکنش فروش</div>
                    </div>

                  </div>

                  {/* Sales Log Table */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-300">لیست آخرین فاکتورهای فروش:</h4>
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-bold">
                          <tr>
                            <th className="p-3">شماره فاکتور</th>
                            <th className="p-3">نام خریدار</th>
                            <th className="p-3">مدل گوشی</th>
                            <th className="p-3">تاریخ</th>
                            <th className="p-3">مبلغ فروش (تومان)</th>
                            <th className="p-3">وضعیت</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-200">
                          {salesList.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-3 font-mono text-amber-400 font-bold">{s.invoiceNo}</td>
                              <td className="p-3 font-bold">{s.customerName}</td>
                              <td className="p-3">{s.phoneModel}</td>
                              <td className="p-3 text-slate-400">{s.date}</td>
                              <td className="p-3 font-black text-emerald-400 dir-ltr text-right">{formatToman(s.price)}</td>
                              <td className="p-3">
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                                  {s.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: PURCHASES & TRADE-INS STATISTICS (آمار گوشی‌های خریداری شده از مردم) */}
              {tab === 'purchases_stats' && (
                <div className="space-y-6">
                  
                  {/* Top Header & Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <RotateCcw className="w-5 h-5 text-blue-400" />
                        <span>آمار خرید گوشی‌های کارکرده از مردم (طرح تعویض)</span>
                      </h3>
                      <p className="text-xs text-slate-400">گزارش تمام گوشی‌های خریداری‌شده و کارشناسی‌شده از مشتریان</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTab('list')}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-700"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>بازگشت به انبار</span>
                      </button>

                      <button
                        onClick={() => setShowNewPurchaseModal(true)}
                        className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        ثبت خرید جدید از مشتری
                      </button>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>کل هزینه پرداخت بابت خرید:</span>
                        <DollarSign className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-blue-400 font-black text-lg dir-ltr text-right">
                        {formatToman(totalPurchaseExpenses)}
                      </div>
                      <div className="text-[10px] text-slate-500">سرمایه‌گذاری در تامین گوشی کارکرده</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>تعداد گوشی‌های خریداری‌شده:</span>
                        <Smartphone className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-white font-black text-lg">
                        {toPersianDigits(totalPurchaseCount)} <span className="text-xs font-normal text-slate-400">دستگاه</span>
                      </div>
                      <div className="text-[10px] text-slate-500">از طریق طرح تعویض آنلاین و حضوری</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                        <span>میانگین قیمت خرید:</span>
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-purple-400 font-black text-lg dir-ltr text-right">
                        {formatToman(Math.round(avgPurchasePrice))}
                      </div>
                      <div className="text-[10px] text-slate-500">میانگین کارشناسی خرید</div>
                    </div>

                  </div>

                  {/* Purchases Log Table */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-300">دفترچه ثبت خریدهای کارکرده از فروشندگان:</h4>
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-bold">
                          <tr>
                            <th className="p-3">کد خرید</th>
                            <th className="p-3">فروشنده</th>
                            <th className="p-3">مدل گوشی</th>
                            <th className="p-3">درجه (Grade)</th>
                            <th className="p-3">مبلغ خرید (تومان)</th>
                            <th className="p-3">تاریخ</th>
                            <th className="p-3">وضعیت انبار</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-200">
                          {purchasesList.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-3 font-mono text-blue-400 font-bold">{p.purchaseNo}</td>
                              <td className="p-3 font-bold">{p.sellerName}</td>
                              <td className="p-3">{p.phoneModel}</td>
                              <td className="p-3">
                                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-black">
                                  Grade {p.grade}
                                </span>
                              </td>
                              <td className="p-3 font-black text-blue-400 dir-ltr text-right">{formatToman(p.purchasePrice)}</td>
                              <td className="p-3 text-slate-400">{p.date}</td>
                              <td className="p-3">
                                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                                  p.status === 'فروخته شده' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 6: SECURITY & PASSWORD CHANGE */}
              {tab === 'security' && (
                <div className="max-w-md mx-auto space-y-6 py-4">
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setTab('list')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl border border-slate-700 transition text-xs"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>بازگشت به لیست انبار</span>
                    </button>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mx-auto">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-extrabold text-white">تغییر رمز عبور ورود به پنل مدیریت</h3>
                    <p className="text-xs text-slate-400">
                      جهت امنیت بیشتر، رمز عبور جدیدی تعیین نمایید.
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">رمز عبور فعلی:</label>
                      <div className="relative">
                        <input
                          type={showCurrentPass ? 'text' : 'password'}
                          required
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                          placeholder="رمز عبور فعلی..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-4 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr text-center font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute left-3 top-2.5 text-slate-400 hover:text-white"
                          title={showCurrentPass ? 'مخفی کردن رمز' : 'مشاهده رمز'}
                        >
                          {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">رمز عبور جدید:</label>
                      <div className="relative">
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="حداقل ۴ کاراکتر..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-4 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr text-center font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute left-3 top-2.5 text-slate-400 hover:text-white"
                          title={showNewPass ? 'مخفی کردن رمز' : 'مشاهده رمز'}
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">تکرار رمز عبور جدید:</label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? 'text' : 'password'}
                          required
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="تکرار رمز عبور جدید..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-4 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr text-center font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute left-3 top-2.5 text-slate-400 hover:text-white"
                          title={showConfirmPass ? 'مخفی کردن رمز' : 'مشاهده رمز'}
                        >
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {passMessage && (
                      <div className={`p-3 rounded-xl border text-xs font-bold text-center flex items-center justify-center gap-2 ${
                        passMessage.isError 
                          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      }`}>
                        {passMessage.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        <span>{passMessage.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition"
                    >
                      ثبت و ذخیره رمز عبور جدید
                    </button>
                  </form>
                </div>
              )}

            </div>

            {/* Bottom Fixed Footer Bar */}
            <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400 font-medium">پایان صفحه مدیریت انبار و فروش</span>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                <span>بازگشت به فروشگاه</span>
              </button>
            </div>
          </>
        )}

      </div>

      {/* MODAL: REGISTER MANUAL SALE */}
      {showNewSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h4 className="text-sm font-extrabold text-emerald-400">ثبت فاکتور فروش جدید</h4>
            <form onSubmit={handleAddManualSale} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">نام خریدار:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: علی محمدی"
                  value={newSaleCustomer}
                  onChange={(e) => setNewSaleCustomer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مدل و مشخصات گوشی:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: iPhone 14 Pro 128GB"
                  value={newSaleModel}
                  onChange={(e) => setNewSaleModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مبلغ کل (تومان):</label>
                <input
                  type="number"
                  required
                  value={newSalePrice}
                  onChange={(e) => setNewSalePrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white dir-ltr font-bold text-emerald-400 text-right"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewSaleModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                >
                  ثبت فروش
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER MANUAL PURCHASE */}
      {showNewPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h4 className="text-sm font-extrabold text-blue-400">ثبت خرید جدید گوشی کارکرده از مشتری</h4>
            <form onSubmit={handleAddManualPurchase} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">نام فروشنده:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حسین نوری"
                  value={newPurchSeller}
                  onChange={(e) => setNewPurchSeller(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مدل و مشخصات گوشی:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Samsung Galaxy S23 Ultra"
                  value={newPurchPhoneModel}
                  onChange={(e) => setNewPurchPhoneModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">درجه ظاهری (Grade):</label>
                <select
                  value={newPurchGrade}
                  onChange={(e) => setNewPurchGrade(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                >
                  <option value="A+">Grade A+ (در حد آکبند)</option>
                  <option value="A">Grade A (خیلی تمیز)</option>
                  <option value="B">Grade B (معمولی)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مبلغ کارشناسی پرداختی (تومان):</label>
                <input
                  type="number"
                  required
                  value={newPurchPrice}
                  onChange={(e) => setNewPurchPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white dir-ltr font-bold text-blue-400 text-right"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPurchaseModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-500 text-slate-950 font-bold"
                >
                  ثبت خرید
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
