import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';

export const CONTACT_EMAIL = 'info@draw.house';

export const navigationLinks: Array<{ text: string; link: string; highlight?: boolean }> = [
  {
    text: 'Home',
    link: '/',
    highlight: true,
  },
  {
    text: 'Examples',
    link: '/examples',
  },
  {
    text: 'Community',
    link: 'https://community.drawhome.com',
  },
  {
    text: 'Blog',
    link: 'https://blog.drawhome.com',
  },
  {
    text: 'Try Now',
    link: PLANNER_URL,
  },
];
