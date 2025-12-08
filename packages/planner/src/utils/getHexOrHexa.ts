import assert from 'assert';
import { ColorInstance } from 'color';

export const getHexOrHexa = (e: ColorInstance) => {
  const hexa = e.hexa();
  assert(hexa.length === 9 && hexa === hexa.toUpperCase(), 'Something went wrong. |362gxy|');

  return !hexa.endsWith('FF') ? hexa : hexa.slice(0, -2);
};
