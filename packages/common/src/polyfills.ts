/* eslint-disable no-extend-native */

Array.prototype.toReversed ??= function(...params) {
  return [...this].reverse(...params);
};

Array.prototype.toSorted ??= function(...params) {
  return [...this].sort(...params);
};

Array.prototype.toSpliced ??= function(...params) {
  const arr = [...this];

  // @ts-expect-error
  arr.splice(...params);

  return arr;
};
