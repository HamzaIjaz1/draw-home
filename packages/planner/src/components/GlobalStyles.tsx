import { createGlobalStyle, css } from 'styled-components';
import { isNull } from '@arthurka/ts-utils';
import { CursorStore, useCursor } from '../zustand';

const _GlobalStyles = createGlobalStyle<{ cursor: CursorStore['cursor'] }>`
  html {
    overscroll-behavior: none;

    ${({ cursor }) => !isNull(cursor) && css`
      cursor: ${cursor};
    `}
  }
`;

export const GlobalStyles = () => {
  const { cursor } = useCursor();

  return (
    <_GlobalStyles cursor={cursor} />
  );
};
