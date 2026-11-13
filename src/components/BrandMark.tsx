interface BrandMarkProps {
  variant?: 'dark' | 'light';
}

export function BrandMark({ variant = 'dark' }: BrandMarkProps) {
  const strokeColor = variant === 'light' ? '#fdf9f3' : '#3e4e38';
  const accentColor = variant === 'light' ? '#d6e8cd' : '#556b2f';
  const textColor = variant === 'light' ? 'text-[#fdf9f3]' : 'text-[#3e4e38]';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${textColor}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="14.5" stroke={strokeColor} strokeWidth="1.25" strokeOpacity="0.4" />
        <path
          d="M16 24.5V8.5"
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M16 12C13.5 11.8 11.5 10 11.5 7.5C14 7.7 15.8 9.5 16 12Z"
          fill={accentColor}
          fillOpacity="0.25"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 12C18.5 11.8 20.5 10 20.5 7.5C18 7.7 16.2 9.5 16 12Z"
          fill={accentColor}
          fillOpacity="0.25"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 16.5C13.2 16.2 11 14.3 11 11.8C13.8 12 15.8 13.9 16 16.5Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 16.5C18.8 16.2 21 14.3 21 11.8C18.2 12 16.2 13.9 16 16.5Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 21C13.4 20.7 11.5 18.9 11.5 16.5C14 16.7 15.8 18.5 16 21Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 21C18.6 20.7 20.5 18.9 20.5 16.5C18 16.7 16.2 18.5 16 21Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-serif text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0">
        HR Artisanal Bakery
      </span>
    </span>
  );
}
