import assert from 'assert';
import { JSONSerializer } from '@arthurka/json-serializer';
import { Quaternion, Vector2, Vector3 } from 'three';
import Color from 'color';

export const extendedJSON = (
  new JSONSerializer('all-predefined')
    .register({
      id: 'Vector2',
      condition: e => e instanceof Vector2,
      serialize: ({ x, y }) => [x, y] as const,
      deserialize: ([x, y]) => new Vector2(x, y),
    })
    .register({
      id: 'Vector3',
      condition: e => e instanceof Vector3,
      serialize: ({ x, y, z }) => [x, y, z] as const,
      deserialize: ([x, y, z]) => new Vector3(x, y, z),
    })
    .register({
      id: 'Quaternion',
      condition: e => e instanceof Quaternion,
      serialize: ({ x, y, z, w }) => [x, y, z, w] as const,
      deserialize: ([x, y, z, w]) => new Quaternion(x, y, z, w),
    })
    .register({
      id: 'Color',
      condition: e => e instanceof Color,
      serialize: e => e.hexa(),
      deserialize: e => new Color(e),
    })
    .make()
);

type SafeJSONParseResult = (
  | { success: true; data: ReturnType<typeof JSON.parse> }
  | { success: false; error: Error }
) extends infer T ? { [K in keyof T]: T[K] } : never;

export const safeJSONParse = (e: string): SafeJSONParseResult => {
  try {
    return {
      success: true,
      data: extendedJSON.parse(e),
    };
  } catch(e) {
    assert(e instanceof Error, 'Something went wrong. |amo3t1|');

    return {
      success: false,
      error: e,
    };
  }
};
