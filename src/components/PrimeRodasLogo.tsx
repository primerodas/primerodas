import React from 'react';

interface PrimeRodasLogoProps {
  className?: string;
  variant?: 'white' | 'dark' | 'auto';
  height?: number;
}

export const PrimeRodasLogo: React.FC<PrimeRodasLogoProps> = ({
  className = '',
  variant = 'white',
  height = 42,
}) => {
  const textColor = variant === 'dark' ? '#050505' : '#FFFFFF';

  return (
    <div className={`inline-flex flex-col select-none leading-none font-sans ${className}`}>
      <svg
        height={height}
        viewBox="0 0 150 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto max-h-full"
      >
        {/* Top Line: prime- */}
        <text
          x="0"
          y="28"
          fill={textColor}
          fontSize="30"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="-0.05em"
        >
          prime-
        </text>

        {/* Bottom Line: r */}
        <text
          x="0"
          y="62"
          fill={textColor}
          fontSize="30"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="-0.05em"
        >
          r
        </text>

        {/* Red Asterisk replacing 'o' in r*das */}
        <g transform="translate(26, 52)">
          {[0, 60, 120].map((angle) => (
            <rect
              key={angle}
              x="-3"
              y="-11"
              width="6"
              height="22"
              rx="3"
              fill="#E30613"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.5" fill="#E30613" />
        </g>

        {/* Bottom Line: das */}
        <text
          x="42"
          y="62"
          fill={textColor}
          fontSize="30"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="-0.05em"
        >
          das
        </text>
      </svg>
    </div>
  );
};

