import { RefinementCtx, z, ZodType } from 'zod/v4';
import { safeJSONParse } from './safeJSONParse';

type Config<T> = {
  emptyValue?: T;
  async?: boolean;
};

export const stringifiedJsonTransformation: {
  <U, V>(schema: ZodType<U, V>): (data: string, ctx: RefinementCtx) => U | Promise<U>;
  <const T extends U, U, V>(schema: ZodType<U, V>, config: Config<T>): (data: string, ctx: RefinementCtx) => U | Promise<U>;
  <const T, U, V>(schema: ZodType<U, V>, config: Config<T>): (data: string, ctx: RefinementCtx) => T | U | Promise<T | U>;
} = <const T, U, V>(...params: [ZodType<U, V>, Config<T>] | [ZodType<U, V>]) => (
  (data: string, ctx: RefinementCtx): T | U | Promise<T | U> => {
    if(params.length === 2 && data === '' && params[1].emptyValue !== undefined) {
      return params[1].emptyValue;
    }

    const parsedData = safeJSONParse(data);

    if(parsedData.success === false) {
      ctx.addIssue({
        code: 'invalid_value',
        message: `JSON.parse error: ${parsedData.error.message}`,
        input: data,
        values: [],
      });

      return z.NEVER;
    }

    const tail = ({ success, data, error }: z.ZodSafeParseResult<U>) => {
      if(success === false) {
        error.issues.forEach(e => ctx.addIssue({
          ...e,
          path: [
            '<STRING TRANSFORMATION>',
            ...e.path,
          ],
        }));

        return z.NEVER;
      }

      return data;
    };

    return (
      params[1]?.async === true
        ? params[0].safeParseAsync(parsedData.data).then(tail)
        : tail(params[0].safeParse(parsedData.data))
    );
  }
);
