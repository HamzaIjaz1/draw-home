import '@draw-house/ui/src/custom';
import '@react-three/drei';
import { Object3D } from 'three';
import { Property } from 'csstype';

type Slice1<T> = T extends [unknown, ...infer R] ? R : never;

declare module '@react-three/drei' {
  function useHelper<T extends new (...args: any[]) => any>(
    object3D: React.MutableRefObject<Object3D | null>,
    helperConstructor: T,
    ...args: Slice1<ConstructorParameters<T>>
  ): React.MutableRefObject<Helper | undefined>;

  function useCursor(hovered: boolean, onPointerOver?: Property.Cursor, onPointerOut?: Property.Cursor, container?: HTMLElement): void;
}

declare module 'react' {
  function useCallback<T>(callback: T, deps: DependencyList): T;
}

import { WITNESS } from '@arthurka/ts-utils';

declare class NoIntersectionError<T, U> {
  private _;
}

declare global {
  interface Document {
    // Warn: iOS has no document.exitPointerLock
    exitPointerLock?: () => void;
  }

  interface ReadonlyArray<T> {
    includes<U>(
      searchElement: T extends { [WITNESS]: unknown } ? T : [U & T] extends [never] ? NoIntersectionError<T, U> : TSReset.WidenLiteral<U>,
      fromIndex?: number,
    ): boolean;
  }

  interface Array<T> {
    includes<U>(
      searchElement: T extends { [WITNESS]: unknown } ? T : [U & T] extends [never] ? NoIntersectionError<T, U> : TSReset.WidenLiteral<U>,
      fromIndex?: number,
    ): boolean;
  }
}
