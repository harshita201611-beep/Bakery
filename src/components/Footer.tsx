import { Mail, Phone } from 'lucide-react';
import { BrandMark } from './BrandMark';

export function Footer() {
  return (
    <footer className="bg-[#1d261a] text-[#d6e8cd]/80 border-t border-[#3e4e38]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-14 md:py-16 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <BrandMark variant="light" />
            <p className="text-sm text-[#d6e8cd]/80 leading-relaxed max-w-sm">
              Shop 14, Commercial Plaza, Sector 43, Golf Course Road, Gurgaon. Slow-fermented sourdough and laminated viennoiserie baked daily since 2021.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="tel:+919811054321"
                aria-label="Call Gurgaon Studio"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#97472e] text-xs font-medium text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 98110 54321</span>
              </a>
              <a
                href="mailto:hello@hrartisanalbakery.in"
                aria-label="Email HR Artisanal Bakery"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#97472e] text-xs font-medium text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Studio</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Daily Menu
                </a>
              </li>
              <li>
                <a href="#custom-orders" className="hover:text-white transition-colors">
                  Celebration Cakes
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#baking-schedule" className="hover:text-white transition-colors">
                  Baking Schedule
                </a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-white transition-colors">
                  Sector 43 Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Allergen Advisory */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white mb-3">
                Studio Hours
              </h4>
              <p className="text-sm text-white">Monday to Sunday: 8:00 AM – 9:00 PM</p>
              <p className="text-xs text-[#d6e8cd]/75 mt-1">
                Hearth pulls at 8:00 AM, 9:30 AM, 11:30 AM, and 4:00 PM.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-[#d6e8cd]/80 leading-relaxed">
                <strong className="text-white font-semibold">Allergen Advisory:</strong> Our bakehouse handles stone-ground wheat, rye, tree nuts, sesame seeds, dairy, and eggs. Speak with our bakers for custom dietary guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d6e8cd]/70">
          <span>© 2026 HR Artisanal Bakery · Sector 43, Gurgaon</span>
          <span className="tabular-nums">FSSAI Lic. #10821005000412</span>
        </div>
      </div>
    </footer>
  );
}
