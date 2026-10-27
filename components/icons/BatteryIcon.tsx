import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function BatteryIcon({
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
      <rect x="2" y="6" width="17" height="12" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 9.5l-2.5 3h3.5l-1 3" />
    </svg>
  );
}

export default BatteryIcon;
