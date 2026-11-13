import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { MenuItem } from './data/bakeryData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { CustomCakeSection } from './components/CustomCakeSection';
import { StorySection } from './components/StorySection';
import { ScheduleAndVisitSection } from './components/ScheduleAndVisitSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    'country-sourdough': 1,
    'pain-au-chocolat': 1,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToastName, setAddedToastName] = useState<string | null>(null);

  const totalBagCount = useMemo(
    () => Object.values(cartQuantities).reduce((acc, qty) => acc + qty, 0),
    [cartQuantities]
  );

  const handleAddToCart = (item: MenuItem) => {
    setCartQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? 0) + 1,
    }));
    setAddedToastName(item.name);
    setTimeout(() => {
      setAddedToastName((current) => (current === item.name ? null : current));
    }, 2200);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartQuantities((prev) => {
      const nextQty = Math.max(0, (prev[itemId] ?? 0) + delta);
      if (nextQty === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: nextQty };
    });
  };

  const handleClearCart = () => {
    setCartQuantities({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f3] text-[#323d2e]">
      <Header cartCount={totalBagCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <MenuSection
          cartQuantities={cartQuantities}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
        <CustomCakeSection />
        <StorySection />
        <ScheduleAndVisitSection />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartQuantities={cartQuantities}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Subtle Add-to-Bag Feedback Banner */}
      {addedToastName && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-[#3e4e38] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs md:text-sm"
        >
          <Check className="w-4 h-4 text-[#d6e8cd] shrink-0" />
          <span>
            Added <strong>{addedToastName}</strong> to bag
          </span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="underline underline-offset-2 text-[#d6e8cd] hover:text-white font-medium ml-1"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
