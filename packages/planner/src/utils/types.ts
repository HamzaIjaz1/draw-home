import { ColorInstance } from 'color';

export type Menu<T extends string, U extends {}> = (
  | (
    & { isOpened: true }
    & { [K in T]: U }
  )
  | (
    & { isOpened: false }
    & { [K in T]: U | null }
  )
);

export type ColorOverlay = {
  type: 'spectrum' | 'predefined';
  value: ColorInstance;
};
