export const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const findOriginalFromOffset = (
  offsetCoordsOriginalCoordsMatched: Array<{ offset: { x: number; y: number }; original: { x: number; y: number } }>,
  offsetX: number,
  offsetY: number,
) => offsetCoordsOriginalCoordsMatched.find(
  pair => pair.offset.x === roundToTwoDecimals(offsetX) &&
    pair.offset.y === roundToTwoDecimals(offsetY),
)?.original;
