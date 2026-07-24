import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { InspectionModal } from './components/InspectionModal';
import { TradeInCalculator } from './components/TradeInCalculator';
import { CompareDrawer } from './components/CompareDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { TrackingModal } from './components/TrackingModal';
import { RegisterModal } from './components/RegisterModal';
import { GuaranteesBanner } from './components/GuaranteesBanner';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, PhoneBrand, RegisteredUser } from './types';
import { SlidersHorizontal, ArrowUpDown, Smartphone, Search, RefreshCw, Filter, ArrowUp } from 'lucide-react';
import { toPersianDigits } from './utils/formatters';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Search State
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    condition: 'all',
    brand: 'all',
    maxPrice: 100000000,
    minPrice: 0,
    storage: 'all',
    sortBy: 'featured',
    inStockOnly: false,
  });

  // Modals & Drawers State
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);
  const [isTradeInOpen, setIsTradeInOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  // User Email & Registration State
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('arad_user_email') || '';
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('arad_user_name') || '';
  });
  const [userPassword, setUserPassword] = useState<string>(() => {
    return localStorage.getItem('arad_user_password') || '';
  });

  // Registered Users list state
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('arad_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'u-1',
        name: 'علی رضایی',
        email: 'sajad.farhadi9090@gmail.com',
        password: 'pass1234',
        registeredAt: '۱۴۰۳/۰۴/۲۴ - ۱۸:۳۰',
      },
      {
        id: 'u-2',
        name: 'رضا محمدی',
        email: 'reza.mohammadi@gmail.com',
        password: 'mypassword789',
        registeredAt: '۱۴۰۳/۰۴/۲۳ - ۱۲:۱۵',
      },
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('arad_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleSaveEmail = (email: string, name: string, password: string) => {
    setUserEmail(email);
    setUserName(name);
    setUserPassword(password);
    localStorage.setItem('arad_user_email', email);
    localStorage.setItem('arad_user_name', name);
    localStorage.setItem('arad_user_password', password);

    setRegisteredUsers((prev) => {
      const existingIdx = prev.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
      const nowPersian = new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
      
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          name: name || updated[existingIdx].name,
          password: password,
          registeredAt: nowPersian,
        };
        return updated;
      } else {
        const newUser: RegisteredUser = {
          id: 'u-' + Date.now(),
          email,
          name: name || 'کاربر گرامی',
          password,
          registeredAt: nowPersian,
        };
        return [newUser, ...prev];
      }
    });
  };

  const handleLogout = () => {
    setUserEmail('');
    setUserName('');
    setUserPassword('');
    localStorage.removeItem('arad_user_email');
    localStorage.removeItem('arad_user_name');
    localStorage.removeItem('arad_user_password');
  };

  const handleDeleteRegisteredUser = (id: string) => {
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleClearRegisteredUsers = () => {
    setRegisteredUsers([]);
  };

  // Cart & Comparison items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchTitle = p.titleFa.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchTag = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchBrand && !matchTag) return false;
      }

      // Condition
      if (filterState.condition !== 'all' && p.condition !== filterState.condition) {
        return false;
      }

      // Brand
      if (filterState.brand !== 'all' && p.brand !== filterState.brand) {
        return false;
      }

      // Storage
      if (filterState.storage !== 'all' && p.specs.storage !== filterState.storage) {
        return false;
      }

      // Price Range
      if (p.price > filterState.maxPrice || p.price < filterState.minPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filterState]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Compare Handlers
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('حداکثر مقایسه همزمان ۳ گوشی امکان‌پذیر است.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Admin Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col dir-rtl">
      {/* Top Navbar */}
      <Navbar
        filterState={filterState}
        setFilterState={setFilterState}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        compareCount={comparedProducts.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        userEmail={userEmail}
      />

      {/* Main Hero Banner */}
      <Hero
        activeBrand={filterState.brand}
        onSelectBrand={(brand) => setFilterState((prev) => ({ ...prev, brand }))}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
      />

      {/* Main Content & Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6">
        
        {/* Catalog Control Header */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">
              ویترین موبایل‌ها ({toPersianDigits(filteredProducts.length)} کالا)
            </h2>
            {filterState.brand !== 'all' && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-xs font-bold">
                برند: {filterState.brand.toUpperCase()}
              </span>
            )}
            {filterState.condition !== 'all' && (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-bold">
                {filterState.condition === 'new' ? 'نو آکبند' : 'کارکرده'}
              </span>
            )}
          </div>

          {/* Sorting & Quick Filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">مرتب‌سازی:</span>
            
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="featured">پیشنهاد آراد (برگزیده)</option>
              <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
              <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
              <option value="newest">جدیدترین‌های انبار</option>
              <option value="rating">محبوب‌ترین (امتیاز کاربری)</option>
            </select>

            {(filterState.brand !== 'all' || filterState.condition !== 'all' || filterState.searchQuery) && (
              <button
                onClick={() => setFilterState({
                  searchQuery: '',
                  condition: 'all',
                  brand: 'all',
                  maxPrice: 100000000,
                  minPrice: 0,
                  storage: 'all',
                  sortBy: 'featured',
                  inStockOnly: false,
                })}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-3 py-2 rounded-xl transition flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                حذف فیلترها
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">هیچ گوشی با این مشخصات یافت نشد!</h3>
            <p className="text-xs text-slate-400">لطفاً عبارات جستجو یا فیلترهای منتخب را تغییر دهید.</p>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '', brand: 'all', condition: 'all' }))}
              className="bg-amber-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs"
            >
              نمایش همه گوشی‌ها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onInspect={(p) => setInspectProduct(p)}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
              />
            ))}
          </div>
        )}

        {/* Guarantees Feature Section */}
        <GuaranteesBanner />

      </main>

      {/* Footer */}
      <Footer onOpenTracking={() => setIsTrackingOpen(true)} />

      {/* Modals & Drawers */}
      <InspectionModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <TradeInCalculator
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={() => setComparedProducts([])}
        onAddToCart={handleAddToCart}
      />

      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        registeredUsers={registeredUsers}
        onDeleteRegisteredUser={handleDeleteRegisteredUser}
        onClearRegisteredUsers={handleClearRegisteredUsers}
      />

      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSaveEmail={handleSaveEmail}
        onLogout={handleLogout}
        currentUserEmail={userEmail}
        currentUserName={userName}
        currentUserPassword={userPassword}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black p-3.5 rounded-full shadow-2xl border border-amber-400/40 transition transform hover:scale-110 flex items-center gap-2 group"
          title="بازگشت به بالای صفحه"
        >
          <ArrowUp className="w-5 h-5 stroke-[3]" />
          <span className="hidden sm:inline text-xs font-black pl-1">بازگشت به بالا</span>
        </button>
      )}
    </div>
  );
}
