import { SVGProps } from "react";

export function TractorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h9l1 3.3-3.3 1.2-1.5-1.5-3 .7 2.3 2.3H3V4Z" />
      <path d="m10 11 2.5-2.5" />
      <path d="M12 8v10h2" />
      <path d="M17 18h-1a2 2 0 0 0-2 2v2" />
      <path d="M18 11h2v2h-2z" />
      <circle cx="7" cy="18" r="3" />
      <circle cx="17" cy="18" r="3" />
    </svg>
  );
}

export function SproutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20h10" />
      <path d="M10 20c0-3.3 1-6 4-6s4 2.7 4 6" />
      <path d="M12 14c0-3.3 1-6 4-6s4 2.7 4 6" />
      <path d="M12 20v-6" />
      <path d="M14 14c-3.3 0-6-1-6-4s2.7-4 6-4 6 1 6 4" />
      <path d="M12 10V4" />
    </svg>
  );
}

export function BookOpenCheckIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
        <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
