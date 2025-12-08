export function *_iterCircularPrevNext<T>(lst: T[]): Generator<[T, T]> {
  if(lst.length < 2) {
    return;
  }
  for(let i = 0; i < lst.length; i++) {
    const nextIndex = (i + 1) % lst.length;
    const currentItem = lst[i];

    if(currentItem === undefined) {
      continue;
    }

    const nextItem = lst[nextIndex] as T;
    yield [currentItem, nextItem];
  }
}

export function *_iterCircularPrevNext2<T>(lst: T[]): Generator<{ prev: T; next: T }> {
  if(lst.length < 2) {
    return;
  }
  for(let i = 0; i < lst.length; i++) {
    const prevIndex = (i - 1 + lst.length) % lst.length;
    const nextIndex = (i + 1) % lst.length;
    const prevItem = lst[prevIndex] as T;
    const nextItem = lst[nextIndex] as T;
    yield { prev: prevItem, next: nextItem };
  }
}
