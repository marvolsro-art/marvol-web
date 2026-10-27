import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function HeatPumpIcon({
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
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="4.25" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 12l-1.5-2.6m1.5 2.6l2.6-1.5m-2.6 1.5l-1.1 2.8m1.1-2.8l2.2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 8.5v7m2-5v3" />
    </svg>
  );
}

export default HeatPumpIcon;
