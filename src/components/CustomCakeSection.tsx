import { FormEvent, useMemo, useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { CAKE_FLAVORS, CAKE_SIZES } from '../data/bakeryData';

const DIETARY_OPTIONS = [
  { id: 'eggless', label: 'Eggless' },
  { id: 'vegan', label: '100% Vegan' },
  { id: 'sugar_free', label: 'Refined Sugar-Free' },
  { id: 'gluten_friendly', label: 'Gluten-Friendly' },
];

export function CustomCakeSection() {
  const [selectedSize, setSelectedSize] = useState(CAKE_SIZES[0].id);
  const [selectedFlavor, setSelectedFlavor] = useState(CAKE_FLAVORS[0].id);
  const [occasion, setOccasion] = useState('birthday');
  const [dietary, setDietary] = useState<string[]>(['eggless']);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('morning');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const estimatedPrice = useMemo(() => {
    const sizeObj = CAKE_SIZES.find((s) => s.id === selectedSize) ?? CAKE_SIZES[0];
    const flavorObj = CAKE_FLAVORS.find((f) => f.id === selectedFlavor) ?? CAKE_FLAVORS[0];
    const dietaryBump = dietary.includes('vegan') || dietary.includes('gluten_friendly') ? 250 : 0;
    return sizeObj.basePrice + flavorObj.surcharge + dietaryBump;
  }, [selectedSize, selectedFlavor, dietary]);

  const toggleDietary = (id: string) => {
    setDietary((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`HR-CAKE-${randomNum}`);
  };

  return (
    <section id="custom-orders" className="py-16 md:py-24 bg-[#fdf9f3] border-b border-[#d3c3bd]/40">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#556b2f] mb-2">
            Bespoke Patisserie
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3e4e38]">
            Design Your Celebration Cake
          </h2>
          <p className="text-sm md:text-base text-[#4f4540] mt-3 leading-relaxed">
            From intimate milestone dinners to wedding tables in Delhi NCR, custom-baked to your flavor palate, dietary needs, and floral aesthetic.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-[#d3c3bd]/70 shadow-[0_12px_36px_-8px_rgba(59,40,30,0.06)]">
          {submittedRef ? (
            <div className="py-8 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#d6e8cd] text-[#3e4e38] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#556b2f] mb-1">
                Inquiry Reference · {submittedRef}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-[#3e4e38] mb-3">
                Bespoke Cake Consultation Received
              </h3>
              <p className="text-sm text-[#4f4540] leading-relaxed mb-6">
                Thank you{customerName ? `, ${customerName}` : ''}. Our head pastry chef has received your{' '}
                <span className="font-medium text-[#3e4e38]">
                  {CAKE_SIZES.find((s) => s.id === selectedSize)?.label}
                </span>{' '}
                {CAKE_FLAVORS.find((f) => f.id === selectedFlavor)?.name} request (estimated{' '}
                <span className="font-semibold tabular-nums">₹{estimatedPrice.toLocaleString('en-IN')}</span>) and will message you on WhatsApp within 2 studio hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="px-6 py-2.5 rounded-full border border-[#3e4e38]/40 text-sm font-medium text-[#3e4e38] hover:bg-[#f1ede7] transition-colors"
              >
                Design Another Cake
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Cake Size */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#3e4e38] mb-3">
                  1. Select Cake Size &amp; Scale
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {CAKE_SIZES.map((size) => {
                    const isSelected = selectedSize === size.id;
                    return (
                      <label
                        key={size.id}
                        className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#97472e] bg-[#fdf9f3]'
                            : 'border-[#d3c3bd]/80 hover:border-[#97472e]/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="cake_size"
                          value={size.id}
                          checked={isSelected}
                          onChange={() => setSelectedSize(size.id)}
                          className="sr-only"
                        />
                        <span className="text-base font-semibold text-[#3e4e38]">{size.label}</span>
                        <span className="text-xs text-[#4f4540] mt-1">{size.servings}</span>
                        <span className="text-xs font-semibold text-[#556b2f] mt-3 tabular-nums">
                          {size.priceLabel}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. Signature Flavor Palette */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#3e4e38] mb-3">
                  2. Signature Flavor Palette
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CAKE_FLAVORS.map((flavor) => {
                    const isSelected = selectedFlavor === flavor.id;
                    return (
                      <label
                        key={flavor.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#97472e] bg-[#f7f3ed]'
                            : 'border-[#d3c3bd]/70 hover:bg-[#fdf9f3]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="flavor"
                          value={flavor.id}
                          checked={isSelected}
                          onChange={() => setSelectedFlavor(flavor.id)}
                          className="mt-1 w-4 h-4 accent-[#97472e]"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#3e4e38]">{flavor.name}</p>
                          <p className="text-xs text-[#4f4540] mt-0.5">{flavor.notes}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 3. Occasion & Dietary Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="cake-occasion"
                    className="block text-sm font-semibold text-[#3e4e38] mb-2"
                  >
                    3. Celebration Occasion
                  </label>
                  <select
                    id="cake-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3.5 py-2.5 text-sm text-[#323d2e] focus:outline-none focus:border-[#97472e]"
                  >
                    <option value="birthday">Milestone Birthday</option>
                    <option value="anniversary">Romantic Anniversary</option>
                    <option value="wedding">Intimate Wedding / Reception</option>
                    <option value="corporate">Corporate Gathering or Launch</option>
                    <option value="other">Other Bespoke Celebration</option>
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[#3e4e38] mb-2">
                    Dietary Specifications
                  </span>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {DIETARY_OPTIONS.map((opt) => {
                      const active = dietary.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleDietary(opt.id)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                            active
                              ? 'border-[#3e4e38] bg-[#3e4e38] text-white'
                              : 'border-[#d3c3bd] bg-white text-[#4f4540] hover:border-[#3e4e38]'
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Schedule & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="pickup-date"
                    className="block text-sm font-semibold text-[#3e4e38] mb-2"
                  >
                    Requested Pickup / Delivery Date
                  </label>
                  <input
                    id="pickup-date"
                    type="date"
                    min={minDate}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3.5 py-2.5 text-sm text-[#323d2e] focus:outline-none focus:border-[#97472e]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pickup-time"
                    className="block text-sm font-semibold text-[#3e4e38] mb-2"
                  >
                    Preferred Gurgaon Time Slot
                  </label>
                  <select
                    id="pickup-time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3.5 py-2.5 text-sm text-[#323d2e] focus:outline-none focus:border-[#97472e]"
                  >
                    <option value="morning">Morning Slot (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon Slot (1:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening Slot (5:00 PM – 8:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-sm font-semibold text-[#3e4e38] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Ananya Mehra"
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3.5 py-2.5 text-sm text-[#323d2e] placeholder:text-[#81756f] focus:outline-none focus:border-[#97472e]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-sm font-semibold text-[#3e4e38] mb-2"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98110 XXXXX"
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3.5 py-2.5 text-sm text-[#323d2e] placeholder:text-[#81756f] focus:outline-none focus:border-[#97472e]"
                  />
                </div>
              </div>

              {/* 5. Inscription & Aesthetic Notes */}
              <div>
                <label
                  htmlFor="cake-notes"
                  className="block text-sm font-semibold text-[#3e4e38] mb-2"
                >
                  Custom Cake Inscription &amp; Aesthetic Notes
                </label>
                <textarea
                  id="cake-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Pressed edible pansies, neutral buttercream finish, 'Happy 30th Rohan' on dark chocolate plaque..."
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg p-3.5 text-sm text-[#323d2e] placeholder:text-[#81756f] focus:outline-none focus:border-[#97472e]"
                />
              </div>

              {/* Summary & Submit */}
              <div className="pt-4 border-t border-[#d3c3bd]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#584237]">
                    Estimated Studio Quote (incl. GST)
                  </p>
                  <p className="font-serif text-2xl font-semibold text-[#3e4e38] tabular-nums">
                    From ₹{estimatedPrice.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#97472e] hover:bg-[#772f18] text-white text-sm md:text-base font-medium px-8 py-3.5 rounded-full shadow-[0_6px_18px_rgba(151,71,46,0.2)] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Submit Cake Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
