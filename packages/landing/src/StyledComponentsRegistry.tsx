'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export const StyledComponentsRegistry: React.FCWithChildren = ({ children }) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  return (
    typeof window !== 'undefined'
      ? children
      : (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
          {children}
        </StyleSheetManager>
      )
  );
};
