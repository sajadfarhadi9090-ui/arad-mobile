export type PhoneCondition = 'new' | 'used';
export type UsedGrade = 'A+' | 'A' | 'B';
export type PhoneBrand = 'apple' | 'samsung' | 'xiaomi' | 'honor' | 'google' | 'nothing' | 'motorola';

export interface InspectionReport {
  batteryHealth: number; // e.g. 96 (%)
  cosmeticGrade: UsedGrade;
  cosmeticDescription: string; // e.g. "در حد آکبند، بدون کوچکترین خط و خش روی بدنه و صفحه"
  screenOriginal: boolean;
  partsReplaced: string; // e.g. "تمامی قطعات ۱۰۰٪ فابریک و بدون تعویضی"
  boxAndAccessories: string; // e.g. "دارای جعبه اصلی + کابل فابریک"
  imeiStatus: string; // e.g. "ثبت شده در سامانه همتا - آماده انتقال مالکیت آنی"
  inspectionScore: number; // e.g. 98 out of 100
  inspectorName: string; // e.g. "مهندس رضایی - کارشناس ارشد موبایل آراد"
  inspectionDate: string; // e.g. "۱۴۰۳/۰۴/۲۰"
}

export interface ProductSpecs {
  screen: string; // e.g. "6.7 اینچ Super Retina XDR OLED 120Hz"
  processor: string; // e.g. "Apple A17 Pro (3nm)"
  mainCamera: string; // e.g. "48MP + 12MP + 12MP Telephoto 5x"
  selfieCamera: string; // e.g. "12MP TrueDepth"
  battery: string; // e.g. "4422 میلی‌آمپر ساعت - شارژ ۲۵ وات"
  storage: '128GB' | '256GB' | '512GB' | '1TB';
  ram: '6GB' | '8GB' | '12GB' | '16GB';
  color: string;
  colorHex: string;
  weight: string;
  os: string;
}

export interface Product {
  id: string;
  titleFa: string;
  titleEn: string;
  brand: PhoneBrand;
  condition: PhoneCondition;
  price: number; // in Tomans
  originalPrice?: number; // for discount
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  warranty: string;
  specs: ProductSpecs;
  inspectionReport?: InspectionReport; // Present if condition === 'used'
  rating: number;
  reviewsCount: number;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface TradeInRequest {
  brand: PhoneBrand;
  model: string;
  storage: string;
  batteryHealth: number;
  cosmeticCondition: string;
  boxAvailable: boolean;
  repairs: string;
  contactName: string;
  contactPhone: string;
  estimatedOffer: number;
}

export interface FilterState {
  searchQuery: string;
  condition: 'all' | 'new' | 'used';
  brand: 'all' | PhoneBrand;
  maxPrice: number;
  minPrice: number;
  storage: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  inStockOnly: boolean;
}
