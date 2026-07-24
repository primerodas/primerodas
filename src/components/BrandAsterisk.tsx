import React from 'react';

interface BrandAsteriskProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const BrandAsterisk: React.FC<BrandAsteriskProps> = ({
  className = "text-[#E30613]",
  size = 20,
  glow = false
}) => {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${glow ? 'drop-shadow-[0_0_8px_rgba(227,6,19,0.8)]' : ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    </span>
  );
};
