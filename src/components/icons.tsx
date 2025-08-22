import type { SVGProps } from "react";

export function DataLensLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M6.5 12C9.27 7 14.73 7 17.5 12" />
      <path d="M6.5 12c2.73 5 8.27 5 11 0" />
    </svg>
  );
}
