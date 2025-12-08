import { useEffect } from 'react';

export const PreloadFonts: React.FC = () => {
  useEffect(() => {
    void document.fonts.load('15px Caveat');
  }, []);

  return null;
};
