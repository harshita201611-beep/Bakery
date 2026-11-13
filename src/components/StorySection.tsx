import { Check } from 'lucide-react';
import { STORY_PILLARS } from '../data/bakeryData';

export function StorySection() {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-[#f7f3ed] border-b border-[#d3c3bd]/40">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#556b2f] mb-2">
            The Philosophy of Slow
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3e4e38]">
            Patient Hands, Wild Ferment
          </h2>
          <p className="text-sm md:text-base text-[#4f4540] mt-3 leading-relaxed">
            We reject chemical dough improvers, frozen par-baked blanks, and industrial shortcuts. Every loaf and laminated pastry matures over 24 to 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORY_PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              className="bg-white p-7 md:p-8 rounded-2xl border border-[#d3c3bd]/60 flex flex-col justify-between"
            >
              <div>
                <p className="font-serif text-3xl font-semibold text-[#556b2f]/40 mb-5 tabular-nums">
                  {pillar.index}.
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#3e4e38] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#4f4540] leading-relaxed">
                  {pillar.body}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#d3c3bd]/40 flex items-center gap-2 text-xs font-medium text-[#584237]">
                <Check className="w-3.5 h-3.5 text-[#556b2f] shrink-0" />
                <span>{pillar.proof}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
