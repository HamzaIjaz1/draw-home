import { isNull, isUndefined } from '@arthurka/ts-utils';

export const clsx = (classes: Array<string | undefined | null>): string | undefined => {
  const arr: string[] = [];

  for(const name of classes) {
    if(isUndefined(name) || isNull(name) || name === '') {
      continue;
    }

    arr.push(name);
  }

  return arr.length === 0
    ? undefined
    : arr.join(' ');
};
