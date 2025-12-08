import type { Metadata } from 'next';
import { getMetaRobots } from '../../utils/getMetaRobots';
import { SofiaPro } from '../../fonts';

import '../../globalStyles.css';

export const metadata: Metadata = {
  title: 'Google Oauth Finish Page',
  robots: getMetaRobots(),
};

export default (function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ fontFamily: SofiaPro }}>
        {children}
      </body>
    </html>
  );
}) satisfies React.FCWithChildren;
