type Split<T extends string, Result extends string[] = []> = (
  T extends `${infer Letter}${infer Rest}`
    ? Split<Rest, [...Result, Letter]>
    : Result
);

export const split = <T extends string>(e: T) => e.split('') as Split<T>;
