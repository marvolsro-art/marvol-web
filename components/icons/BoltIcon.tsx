import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function BoltIcon({
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
        d="M3.75 13.5l10.5-11.25L10.5 9h7.5L7.5 21.75 10.5 13.5H3.75z"
      />
    </svg>
  );
}

export default BoltIcon;
