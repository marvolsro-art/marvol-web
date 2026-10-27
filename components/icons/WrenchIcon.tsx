import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function WrenchIcon({
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
        d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484l-8.498 8.498a2.25 2.25 0 01-3.182-3.182l8.498-8.498A4.5 4.5 0 0118.167 3.25l-2.613 2.614a.75.75 0 000 1.06l1.52 1.52a.75.75 0 001.06 0l2.614-2.613a4.48 4.48 0 011.002.919z"
      />
    </svg>
  );
}

export default WrenchIcon;
