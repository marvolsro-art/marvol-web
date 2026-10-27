import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function BuildingColumnsIcon({
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
        d="M12 3l9 4.5H3L12 3zm-7.5 7.5v7.5m5-7.5v7.5m5-7.5v7.5m5-7.5v7.5M2.25 20.25h19.5"
      />
    </svg>
  );
}

export default BuildingColumnsIcon;
