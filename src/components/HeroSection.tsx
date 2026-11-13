import { ArrowRight, Store } from 'lucide-react';
import { HERO_IMAGES } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section className="bg-[#fdf9f3] border-b border-[#d3c3bd]/40 py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start">
            {/* Quiet Unboxed Metadata */}
            <p className="text-xs md:text-sm font-medium text-[#584237] tracking-wide mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Sector 43, Golf Course Road, Gurgaon</span>
              <span aria-hidden="true">·</span>
              <span>Open Daily 8:00 AM – 9:00 PM</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#556b2f] font-semibold">Fresh Sourdough Batch Out</span>
            </p>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[1.1] font-semibold tracking-tight text-[#3e4e38] text-balance mb-6">
              Slow-Fermented,{' '}
              <span className="italic font-normal text-[#556b2f]">Baked Fresh</span> Daily
            </h1>

            {/* Poetic Subtext */}
            <p className="text-base md:text-lg text-[#4f4540] leading-relaxed max-w-xl mb-8">
              Handcrafted rustic sourdough, 72-layer butter viennoiserie, and bespoke celebration cakes made with 100% wild levain starter and stone-ground heritage grains in Gurgaon.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-[#97472e] hover:bg-[#772f18] text-white text-sm md:text-base font-medium px-7 py-3.5 rounded-full shadow-[0_6px_18px_rgba(151,71,46,0.2)] transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#custom-orders"
                className="inline-flex items-center gap-2 border border-[#3e4e38]/40 text-[#3e4e38] hover:bg-[#f1ede7] text-sm md:text-base font-medium px-7 py-3.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Store className="w-4 h-4" />
                <span>Order Custom Cake</span>
              </a>
            </div>

            {/* Clean Unboxed Craft Strip */}
            <div className="w-full pt-6 border-t border-[#d3c3bd]/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm font-medium text-[#584237]">
              <span>36-Hour Cold Fermentation</span>
              <span aria-hidden="true" className="text-[#d3c3bd]">·</span>
              <span>Zero Preservatives</span>
              <span aria-hidden="true" className="text-[#d3c3bd]">·</span>
              <span>Stone-Deck Hearth Baked</span>
            </div>
          </div>

          {/* Right Photography Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative flex">
            <div className="relative w-full rounded-2xl bg-white p-3 border border-[#d3c3bd]/60 shadow-[0_12px_36px_-6px_rgba(59,40,30,0.1)] flex flex-col">
              <div className="relative w-full h-[380px] sm:h-[440px] lg:h-full lg:min-h-[450px] rounded-xl overflow-hidden">
                <ResilientImage
                  src={HERO_IMAGES.main}
                  alt="Freshly baked rustic country sourdough boule beside a ceramic cup of cortado coffee in morning light"
                  fallbackTitle="Country Sourdough & Cortado"
                  className="w-full h-full object-cover"
                />
                {/* Measured gradient scrim for WCAG AA contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d261a]/85 via-[#1d261a]/20 to-transparent" />

                {/* Bottom Hearth Pull Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#fdf9f3]/95 backdrop-blur-md p-4 rounded-xl border border-[#d3c3bd]/50 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#97472e]">
                      Next Hearth Pull · 11:30 AM
                    </p>
                    <p className="font-serif text-base font-semibold text-[#3e4e38] mt-0.5">
                      Country Sourdough &amp; Seeded Rye
                    </p>
                    <p className="text-xs text-[#4f4540] mt-0.5">
                      Available for Sector 43 pickup or local delivery
                    </p>
                  </div>
                  <a
                    href="#baking-schedule"
                    className="text-xs font-semibold text-[#3e4e38] hover:text-[#97472e] underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Full Schedule
                  </a>
                </div>
              </div>

              {/* Subtle Overlapping Pastry Frame on Desktop */}
              <div className="hidden sm:block absolute -top-4 -left-4 bg-white p-2 rounded-xl border border-[#d3c3bd]/70 shadow-md -rotate-2">
                <div className="w-24 h-20 rounded-lg overflow-hidden mb-1">
                  <ResilientImage
                    src={HERO_IMAGES.inset}
                    alt="72-layer laminated French pain au chocolat"
                    fallbackTitle="Pain au Chocolat"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-serif italic text-[11px] text-center text-[#3e4e38]">
                  72 Butter Layers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
