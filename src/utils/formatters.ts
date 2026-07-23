// Persian Digits Map
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const toPersianDigits = (num: number | string): string => {
  if (num === null || num === undefined) return '';
  return num
    .toString()
    .replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
};

export const formatToman = (priceInToman: number): string => {
  if (!priceInToman) return '۰ تومان';
  const formatted = priceInToman.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} تومان`;
};

export const formatPercent = (val: number): string => {
  return `${toPersianDigits(val)}٪`;
};

export const getConditionText = (condition: 'new' | 'used', grade?: 'A+' | 'A' | 'B'): string => {
  if (condition === 'new') return 'آکبند (پلمپ شرکتی)';
  switch (grade) {
    case 'A+':
      return 'کارکرده - در حد آکبند (Grade A+)';
    case 'A':
      return 'کارکرده - تمیز و عالی (Grade A)';
    case 'B':
      return 'کارکرده - معمولی (Grade B)';
    default:
      return 'کارکرده (دست دوم)';
  }
};

export const getBrandNameFa = (brand: string): string => {
  switch (brand.toLowerCase()) {
    case 'apple':
      return 'اپل (آیفون)';
    case 'samsung':
      return 'سامسونگ';
    case 'xiaomi':
      return 'شیائومی';
    case 'honor':
      return 'آنر';
    case 'google':
      return 'گوگل پکسل';
    case 'nothing':
      return 'ناثینگ فون';
    case 'motorola':
      return 'موتورولا';
    default:
      return brand;
  }
};
