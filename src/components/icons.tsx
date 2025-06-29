import type { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Head and Ears */}
      <path 
        d="M20.6,10.2C19.8,9.6,16.5,8,12,8S4.2,9.6,3.4,10.2C2.5,10.8,2,11.9,2,13v2c0,4.4,4.5,7,10,7s10-2.6,10-7v-2C22,11.9,21.5,10.8,20.6,10.2Z"
        fill="currentColor" 
      />
      {/* Horns */}
      <path 
        d="M7,9 C5,4,9.5,3,9.5,3" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
      />
      <path 
        d="M17,9 C19,4,14.5,3,14.5,3" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round"
      />
      {/* Eyes */}
      <circle cx="9" cy="12" r="1.5" fill="#00BFFF" />
      <circle cx="15" cy="12" r="1.5" fill="#00BFFF" />
    </svg>
  )
}
