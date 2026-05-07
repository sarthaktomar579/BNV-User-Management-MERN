// Stylized "BNV" monogram mark used in the application header.
// We render it inline as an SVG so it scales crisply at any size and
// inherits theme colors without needing an external image asset.
export default function BnvLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="BNV logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bnv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#173a7a" />
          <stop offset="100%" stopColor="#3aa1ff" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#bnv-grad)" />
      {/* Stylized B / V mark inside the badge */}
      <path
        d="M18 16 H34 a8 8 0 0 1 0 16 H22 v0 H34 a8 8 0 0 1 0 16 H18 Z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M40 16 L46 16 L40 48 L34 48 Z"
        fill="#ffffff"
        opacity="0.6"
      />
    </svg>
  );
}
