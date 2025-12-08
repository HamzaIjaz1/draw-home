import localFont from 'next/font/local';

const sofiaPro = localFont({
  src: [
    {
      path: '../public/fonts/sofia-pro/light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/sofia-pro/regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/sofia-pro/medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/sofia-pro/semi-bold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  fallback: ['sans-serif'],
});

const europa = localFont({
  src: [
    {
      path: '../public/fonts/europa/light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/europa/regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  fallback: ['sans-serif'],
});

export const SofiaPro = sofiaPro.style.fontFamily;
export const Europa = europa.style.fontFamily;
