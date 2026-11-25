import React from 'react';

export function ConverseEmblem({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M18 4.5C10.544 4.5 4.5 10.544 4.5 18C4.5 25.456 10.544 31.5 18 31.5C25.456 31.5 31.5 25.456 31.5 18C31.5 14.37 30.068 11.074 27.738 8.647"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="24.5" cy="9.5" r="2.2" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function PumaCatMark({className = 'w-11 h-7'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="currentColor"
      aria-label="Puma"
      className={className}
    >
      <path d="M51.2 6.8c-1.8-1.4-4.2-1.8-6.4-1.1-1.9.6-3.4 2-4.8 3.3-3.1 2.9-6.6 5.5-10.7 6.8-3.8 1.2-7.8.9-11.6-.2-2.7-.8-5.3-2-8-2.4-2.4-.4-5.1-.1-7.2 1.2-.5.3-.9.9-.6 1.4.3.5.9.5 1.5.4 2.7-.5 5.4.2 7.8 1.2 3.1 1.3 6.2 2.8 9.6 3.1 3.7.4 7.5-.5 10.8-2.3 2.7-1.5 5-3.7 7.1-6 .7-.7 1.3-1.5 2.1-2.1 1.1-.8 2.6-1 3.9-.5.5.2 1 .6 1.6.5.7-.1 1.2-.8 1.1-1.5-.1-.7-.6-1.3-1.2-1.8zm-36.7 13.4c-1.6 1.8-3.5 3.4-5.7 4.4-.7.3-1.5.6-1.8 1.3-.3.6 0 1.5.6 1.8.8.4 1.8 0 2.5-.5 2.7-1.8 5-4.3 6.7-7-.8-.1-1.6-.1-2.3 0zm22.4-1.8c1.1 2.7 2.5 5.3 4.3 7.6.6.8 1.5 1.6 2.5 1.4.7-.2 1.1-.9 1-1.6-.2-1-.9-1.7-1.5-2.5-1.4-1.8-2.5-3.8-3.3-5.9-.9.4-1.9.7-3 1z" />
    </svg>
  );
}

export function NikeSwooshMark({className = 'w-12 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 68 24"
      fill="currentColor"
      aria-label="Nike"
      className={className}
    >
      <path d="M19.8 20.6c-4.7 1.3-9.8 1.1-13.2-1.4-3.1-2.3-3.9-6.6-2-10.7 1.2-2.6 3.3-5.1 5.6-7.3-.9 2.3-1.5 4.8-.9 7 .7 2.6 2.9 4.1 6.1 4.1 2.3 0 5.1-.5 8.1-1.3L64.8.7c.4-.1.7.3.3.5L23.9 19.1c-1.3.6-2.7 1.1-4.1 1.5z" />
    </svg>
  );
}
