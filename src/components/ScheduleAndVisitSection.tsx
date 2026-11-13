import { FormEvent, useState } from 'react';
import { Check, Clock, Copy, MapPin, Phone } from 'lucide-react';
import { BAKING_SCHEDULE, GALLERY_ITEMS } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

export function ScheduleAndVisitSection() {
  const [activeSlotId, setActiveSlotId] = useState(BAKING_SCHEDULE[2].id);
  const [addressCopied, setAddressCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCopyAddress = async () => {
    const fullAddress =
      'HR Artisanal Bakery, Shop 14, Commercial Plaza, Sector 43, Golf Course Road, Gurgaon, Haryana 122002';
    try {
      await navigator.clipboard.writeText(fullAddress);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2400);
    } catch {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2400);
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section id="baking-schedule" className="py-16 md:py-24 bg-[#fdf9f3]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Daily Baking Schedule (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 border border-[#d3c3bd]/70">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#556b2f] mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Clockwork Hearth</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#3e4e38] mb-2">
              Daily Baking Schedule
            </h2>
            <p className="text-sm text-[#4f4540] mb-6 leading-relaxed">
              Warm loaves and laminated pastries reach the counter on a strict schedule. Select a pull time to inspect what comes out hot.
            </p>

            <div className="space-y-4">
              {BAKING_SCHEDULE.map((slot) => {
                const isSelected = slot.id === activeSlotId;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setActiveSlotId(slot.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#3e4e38] bg-[#f7f3ed]'
                        : 'border-[#d3c3bd]/50 hover:bg-[#fdf9f3]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 tabular-nums ${
                        isSelected
                          ? 'bg-[#3e4e38] text-white'
                          : 'bg-[#f1ede7] text-[#3e4e38]'
                      }`}
                    >
                      {slot.step}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#97472e] tabular-nums">
                        {slot.time}
                      </p>
                      <h3 className="font-serif text-base font-semibold text-[#3e4e38] mt-0.5">
                        {slot.title}
                      </h3>
                      <p className="text-xs text-[#4f4540] mt-1 leading-relaxed">
                        {slot.description}
                      </p>
                      {isSelected && (
                        <p className="text-xs font-medium text-[#556b2f] mt-2">
                          Featured: {slot.featuredItems.join(' · ')}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Gurgaon Studio & Newsletter (7 Cols) */}
          <div id="visit-us" className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#d3c3bd]/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#556b2f]">
                    Our Gurgaon Flagship
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#3e4e38] mt-1">
                    Sector 43, Golf Course Road
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#d3c3bd] text-xs font-medium text-[#3e4e38] hover:bg-[#f1ede7] transition-colors whitespace-nowrap shrink-0"
                  >
                    {addressCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#556b2f]" />
                        <span>Copied Address</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                  <a
                    href="tel:+919811054321"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3e4e38] text-white text-xs font-medium hover:bg-[#323d2e] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 98110 54321</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#d3c3bd]/50 mb-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#584237]">
                    Studio &amp; Bakehouse Address
                  </p>
                  <p className="text-sm font-medium text-[#3e4e38] mt-1 leading-relaxed">
                    Shop 14, Commercial Plaza, Sector 43,
                    <br />
                    Golf Course Road, Gurgaon, Haryana 122002
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#584237]">
                    Bakehouse Hours &amp; Parking
                  </p>
                  <p className="text-sm font-medium text-[#3e4e38] mt-1 leading-relaxed">
                    Monday – Sunday: 8:00 AM – 9:00 PM
                    <br />
                    <span className="text-xs font-normal text-[#4f4540]">
                      2 min walk from Sector 42–43 Rapid Metro · Valet outside plaza
                    </span>
                  </p>
                </div>
              </div>

              {/* Architectural Cartographic Neighborhood Map SVG */}
              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-[#d3c3bd]/70 bg-[#f7f3ed]">
                <svg
                  viewBox="0 0 800 320"
                  className="w-full h-full object-cover"
                  role="img"
                  aria-label="Architectural street map of Sector 43, Golf Course Road, Gurgaon showing HR Artisanal Bakery"
                >
                  <rect width="800" height="320" fill="#f7f3ed" />
                  {/* Subtle neighborhood blocks */}
                  <rect x="30" y="25" width="170" height="105" rx="8" fill="#efeae1" />
                  <rect x="235" y="25" width="210" height="105" rx="8" fill="#efeae1" />
                  <rect x="480" y="25" width="285" height="105" rx="8" fill="#e6ede2" />
                  <rect x="30" y="185" width="220" height="110" rx="8" fill="#efeae1" />
                  <rect x="285" y="185" width="210" height="110" rx="8" fill="#e6ede2" />
                  <rect x="530" y="185" width="235" height="110" rx="8" fill="#efeae1" />

                  {/* Golf Course Road Main Artery */}
                  <path d="M 0 158 L 800 158" stroke="#d3c3bd" strokeWidth="18" />
                  <path d="M 0 158 L 800 158" stroke="#fdf9f3" strokeWidth="2" strokeDasharray="10 8" />

                  {/* Cross Streets */}
                  <path d="M 218 0 L 218 320" stroke="#dfd5cd" strokeWidth="10" />
                  <path d="M 462 0 L 462 320" stroke="#dfd5cd" strokeWidth="12" />
                  <path d="M 512 158 L 512 320" stroke="#dfd5cd" strokeWidth="8" />

                  {/* Labels */}
                  <text x="55" y="162" fill="#584237" fontSize="11" fontWeight="600" letterSpacing="1.5">
                    GOLF COURSE ROAD
                  </text>
                  <text x="580" y="162" fill="#584237" fontSize="11" fontWeight="600" letterSpacing="1.5">
                    TOWARDS DLF PHASE V
                  </text>
                  <text x="48" y="82" fill="#6b5d56" fontSize="12" fontWeight="500">
                    Sector 42–43 Rapid Metro
                  </text>
                  <text x="265" y="82" fill="#3e4e38" fontSize="12" fontWeight="600">
                    Commercial Plaza · Shop 14
                  </text>
                  <text x="550" y="82" fill="#556b2f" fontSize="12" fontWeight="500">
                    Sushant Lok Park
                  </text>
                  <text x="550" y="245" fill="#6b5d56" fontSize="12" fontWeight="500">
                    Sector 43 Residential
                  </text>

                  {/* Bakery Location Marker */}
                  <circle cx="350" cy="118" r="24" fill="#97472e" fillOpacity="0.16" />
                  <circle cx="350" cy="118" r="10" fill="#97472e" stroke="#ffffff" strokeWidth="3" />
                </svg>

                <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-[#d3c3bd] shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#97472e] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-[#3e4e38]">
                      HR Artisanal Bakery
                    </p>
                    <p className="text-xs text-[#4f4540]">
                      Shop 14, Sector 43 Plaza · Open till 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sourdough Club Newsletter */}
            <div className="bg-[#3e4e38] text-[#fdf9f3] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#d6e8cd]">
                  Weekly Hearth Dispatch
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-white mt-1">
                  Join The Sourdough Club
                </h3>
                <p className="text-xs md:text-sm text-[#d6e8cd]/90 mt-1.5 max-w-md leading-relaxed">
                  Receive morning bake schedules, weekend viennoiserie specials, and seasonal tasting notes every Thursday.
                </p>
              </div>

              {subscribed ? (
                <div className="inline-flex items-center gap-2 bg-white/10 border border-[#d6e8cd]/40 rounded-full px-5 py-3 text-sm text-[#d6e8cd] shrink-0">
                  <Check className="w-4 h-4" />
                  <span>Subscribed to Thursday Dispatch</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 shrink-0"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address for Sourdough Club"
                    className="bg-white/10 border border-[#d6e8cd]/40 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white min-w-[210px]"
                  />
                  <button
                    type="submit"
                    className="bg-[#97472e] hover:bg-[#772f18] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Behind the Hearth Documentary Gallery */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#3e4e38]">
                Behind the Hearth
              </h3>
              <p className="text-sm text-[#4f4540] mt-1">
                Daily proofing, hand scoring, and stone-deck bakes at our Sector 43 studio.
              </p>
            </div>
            <p className="text-xs font-semibold text-[#556b2f]">
              @hrartisanalbakery · #HRBakeryGurgaon
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <figure
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#f1ede7] border border-[#d3c3bd]/50"
              >
                <ResilientImage
                  src={item.src}
                  alt={item.alt}
                  fallbackTitle={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1d261a]/85 via-[#1d261a]/40 to-transparent text-xs font-medium text-[#fdf9f3]">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
