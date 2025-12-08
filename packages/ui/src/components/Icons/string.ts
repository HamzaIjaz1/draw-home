export const getPlusCircledSvgString = (color: string) => (
  `
    <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x=".65" y=".65" width="80.7" height="80.7" rx="40.35" stroke="${color}" strokeWidth="1.3"/>
      <path d="M28 41.5h12.5m0 0H53m-12.5 0V29m0 12.5V54" stroke="${color}" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  `.trim()
);
