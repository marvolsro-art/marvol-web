import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function CarIcon({
  className = "w-6 h-6 flex-shrink-0",
  strokeWidth = 1.8,
  size,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.5l1.8-4.2A2.5 2.5 0 017.1 7.5h9.8a2.5 2.5 0 012.3 1.8l1.8 4.2v4.5a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5V17H6v1a1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 012 18v-4.5h1z"
      />
      <circle cx="6.5" cy="14.5" r="1.5" />
      <circle cx="17.5" cy="14.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h18" />
    </svg>
  );
}

export default CarIcon;
