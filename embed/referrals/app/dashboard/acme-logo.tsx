import { SVGProps } from "react";

export function AcmeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="46"
      fill="none"
      viewBox="0 0 47 46"
      {...props}
    >
      <path
        fill="#000"
        d="M.5 23c0-12.702 10.298-23 23-23s23 10.298 23 23-10.297 23-23 23S.5 35.703.5 23"
      ></path>
      <circle cx="15.747" cy="27.36" r="5.393" fill="#fff"></circle>
      <path fill="#fff" d="M18.126 11.37h9.65l9.178 21.384h-9.65z"></path>
    </svg>
  );
}
