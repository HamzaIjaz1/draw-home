export const encodeSvgAsDataUri = (svg: string) => {
  const encoded = window.encodeURIComponent(svg);
  return `data:image/svg+xml;utf8,${encoded}`;
};
