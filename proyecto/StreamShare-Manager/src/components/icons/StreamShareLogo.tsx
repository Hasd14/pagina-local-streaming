import type { SVGProps } from 'react';

export function StreamShareLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12.37A10 10 0 0 1 12 2.37a10 10 0 0 1 10 10" />
      <path d="M22 12.37A10 10 0 0 1 12 22.37a10 10 0 0 1-10-10" />
      <path d="M12 2.37v20" />
      <path d="M2.37 12h20" />
    </svg>
  );
}
