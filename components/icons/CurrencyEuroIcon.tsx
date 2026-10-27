import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function CurrencyEuroIcon({
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
        d="M14.25 7.756a4.5 4.5 0 100 8.488M6.75 10.5h7.5m-7.5 3h7.5"
      />
    </svg>
  );
}

export default CurrencyEuroIcon;
