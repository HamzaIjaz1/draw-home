import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    form: {
      disabled: string;
      inputBorder: string;
    };
    general: {
      purpleGray: string;
      successBorder: string;
    };
  }

  interface PaletteOptions {
    form: {
      disabled: string;
      inputBorder: string;
    };
    general: {
      purpleGray: string;
      successBorder: string;
    };
  }
}

import { WITNESS } from '@arthurka/ts-utils';

declare class NoIntersectionError<T, U> {
  private _;
}

declare global {
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
