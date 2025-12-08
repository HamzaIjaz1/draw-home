type Split<T extends string, Result extends string[] = []> = (T extends `${infer Letter}${infer Rest}` ? Split<Rest, [...Result, Letter]> : Result);
export declare const split: <T extends string>(e: T) => Split<T>;
export {};
//# sourceMappingURL=split.d.ts.map