import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#custom-orders', label: 'Custom Orders' },
  { href: '#our-story', label: 'Our Story' },
  { href: '#baking-schedule', label: 'Schedule' },
  { href: '#visit-us', label: 'Visit Us' },
];

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf9f3]/95 backdrop-blur-md border-b border-[#d3c3bd]/60">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3e4e38] rounded-sm whitespace-nowrap shrink-0"
        >
          <BrandMark variant="dark" />
        </a>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4f4540] hover:text-[#3e4e38] underline-offset-8 hover:underline decoration-[#556b2f]/60 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-[#3e4e38] hover:bg-[#f1ede7] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#3e4e38]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#97472e] text-white text-[11px] font-bold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className="hidden sm:inline-flex items-center justify-center bg-[#97472e] hover:bg-[#772f18] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Order Online
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#3e4e38] hover:bg-[#f1ede7] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-[#d3c3bd]/50 bg-[#fdf9f3] px-5 py-4 flex flex-col gap-3"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-[#323d2e] hover:text-[#97472e] border-b border-[#d3c3bd]/30 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 inline-flex items-center justify-center bg-[#97472e] text-white text-sm font-medium px-5 py-3 rounded-full"
          >
            Order Online
          </a>
        </nav>
      )}
    </header>
  );
}
