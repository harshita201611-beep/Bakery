import { useMemo, useState } from 'react';
import { Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import {
  DietaryFilter,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

interface MenuSectionProps {
  cartQuantities: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export function MenuSection({
  cartQuantities,
  onAddToCart,
  onUpdateQuantity,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'vegan' && item.dietaryTags.includes('100% Vegan')) ||
        (dietaryFilter === 'eggless' &&
          (item.dietaryTags.includes('Eggless') ||
            item.dietaryTags.includes('Eggless Opt') ||
            item.dietaryTags.includes('100% Vegan')));

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#f7f3ed] border-b border-[#d3c3bd]/40">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        {/* Section Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#556b2f] mb-2">
              Daily Hearth Selection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3e4e38]">
              From Our Ovens
            </h2>
            <p className="text-sm md:text-base text-[#4f4540] mt-2 max-w-xl">
              Crafted with wild levain, cultured Normandy butter, and patient hands. Baked in limited morning and afternoon batches.
            </p>
          </div>

          {/* Search & Dietary Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#584237] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search loaves or pastries..."
                aria-label="Search menu items"
                className="w-full sm:w-56 bg-white border border-[#d3c3bd] rounded-full pl-9 pr-4 py-2 text-sm text-[#323d2e] placeholder:text-[#81756f] focus:outline-none focus:border-[#3e4e38]"
              />
            </div>

            <div
              className="inline-flex items-center p-1 bg-[#f1ede7] rounded-full border border-[#d3c3bd]/60 self-start"
              role="group"
              aria-label="Dietary filter"
            >
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'vegan', label: 'Vegan' },
                  { id: 'eggless', label: 'Eggless' },
                ] as { id: DietaryFilter; label: string }[]
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDietaryFilter(option.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    dietaryFilter === option.id
                      ? 'bg-[#3e4e38] text-white'
                      : 'text-[#4f4540] hover:text-[#3e4e38]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8"
          role="tablist"
          aria-label="Menu categories"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#3b281e] text-white'
                    : 'bg-white text-[#4f4540] hover:text-[#3e4e38] border border-[#d3c3bd]/70'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d3c3bd]/60 p-12 text-center">
            <p className="font-serif text-xl text-[#3e4e38] mb-2">
              No bakes match your current filters
            </p>
            <p className="text-sm text-[#4f4540] mb-6">
              Try clearing your search query or switching back to all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#3e4e38] text-white text-sm font-medium hover:bg-[#323d2e] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const qty = cartQuantities[item.id] ?? 0;

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-xl p-4 border border-[#d3c3bd]/60 hover:shadow-[0_10px_24px_rgba(59,40,30,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* 4:3 Product Photography */}
                    <button
                      type="button"
                      onClick={() => setActiveProduct(item)}
                      className="block w-full aspect-[4/3] rounded-lg overflow-hidden mb-3.5 bg-[#f1ede7] text-left focus-visible:outline-2 focus-visible:outline-[#3e4e38]"
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.imageAlt}
                        fallbackTitle={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>

                    {/* Clean Unboxed Metadata */}
                    <p className="text-[11px] font-medium text-[#584237] mb-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#556b2f] font-semibold">{item.dietaryTags[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.weightOrPortion}</span>
                      {item.highlightLabel && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#97472e] font-semibold">{item.highlightLabel}</span>
                        </>
                      )}
                    </p>

                    <button
                      type="button"
                      onClick={() => setActiveProduct(item)}
                      className="text-left block w-full"
                    >
                      <h3 className="font-serif text-lg font-semibold text-[#3e4e38] group-hover:text-[#97472e] transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </button>

                    <p className="text-xs md:text-sm text-[#4f4540] line-clamp-2 mt-1.5 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Stepper Footer */}
                  <div className="pt-3 border-t border-[#d3c3bd]/40 flex items-center justify-between gap-2 mt-auto">
                    <span className="font-serif text-xl font-semibold text-[#24140b] tabular-nums">
                      ₹{item.price}
                    </span>

                    {qty > 0 ? (
                      <div className="inline-flex items-center gap-1 bg-[#3e4e38] text-white rounded-full p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f1ede7] hover:bg-[#97472e] text-[#3e4e38] hover:text-white text-xs font-semibold transition-colors duration-150 active:scale-95 whitespace-nowrap shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d261a]/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="bg-[#fdf9f3] rounded-2xl max-w-2xl w-full overflow-hidden border border-[#d3c3bd] shadow-2xl grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-6 aspect-[4/3] md:aspect-auto md:h-full bg-[#f1ede7]">
              <ResilientImage
                src={activeProduct.image}
                alt={activeProduct.imageAlt}
                fallbackTitle={activeProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 p-6 md:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-xs font-medium text-[#556b2f]">
                    {activeProduct.categoryLabel} · {activeProduct.weightOrPortion}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveProduct(null)}
                    aria-label="Close product details"
                    className="p-1.5 rounded-full text-[#4f4540] hover:bg-[#f1ede7] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="product-modal-title"
                  className="font-serif text-2xl font-semibold text-[#3e4e38] mb-2"
                >
                  {activeProduct.name}
                </h3>

                <p className="text-sm text-[#4f4540] leading-relaxed mb-4">
                  {activeProduct.description}
                </p>

                <div className="space-y-3 text-xs text-[#4f4540] border-t border-[#d3c3bd]/50 pt-4">
                  <div>
                    <span className="font-semibold text-[#3e4e38] block mb-0.5">
                      Tasting Notes
                    </span>
                    <p>{activeProduct.tastingNotes}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#3e4e38] block mb-0.5">
                      Key Ingredients
                    </span>
                    <p>{activeProduct.ingredients.join(' · ')}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#3e4e38] block mb-0.5">
                      Hearth Pull &amp; Allergens
                    </span>
                    <p>
                      Oven Pull: {activeProduct.batchTime}. {activeProduct.allergens}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#d3c3bd]/50 flex items-center justify-between gap-4">
                <span className="font-serif text-2xl font-semibold text-[#24140b] tabular-nums">
                  ₹{activeProduct.price}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(activeProduct);
                    setActiveProduct(null);
                  }}
                  className="inline-flex items-center gap-2 bg-[#97472e] hover:bg-[#772f18] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
