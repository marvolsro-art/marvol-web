import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function CookieIcon({
  className = "w-4 h-4 flex-shrink-0",
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
        d="M12 2a10 10 0 1010 10 4 4 0 01-5-5 4 4 0 01-5-5zm-3.5 8a1 1 0 110-2 1 1 0 010 2zm7 5a1 1 0 110-2 1 1 0 010 2zm-5 4a1 1 0 110-2 1 1 0 010 2zm-1.5-6a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );
}

export default CookieIcon;
