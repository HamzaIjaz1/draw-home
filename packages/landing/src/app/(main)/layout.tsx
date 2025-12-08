import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { StylesReset } from '@draw-house/common/dist/style-reset';
import { strapiJwtCookieName } from '@draw-house/common/dist/constants';
import { trimMultiline } from '@arthurka/ts-utils';
import { StyledComponentsRegistry } from '../../StyledComponentsRegistry';
import { type AuthContextProps, AuthContextWrapper } from '../../components/AuthContext';
import { serverCheckUser } from '../../services';
import { SofiaPro } from '../../fonts';
import { getMetaRobots } from '../../utils/getMetaRobots';

import '../../globalStyles.css';

export const metadata: Metadata = {
  robots: getMetaRobots(),
};

export default (async function RootLayout({ children }) {
  const jwt = cookies().get(strapiJwtCookieName)?.value;

  const defaultProps: AuthContextProps = {
    defaultUser: null,
    defaultLoggedIn: false,
    defaultVerified: false,
  };

  if(jwt) {
    const res = await serverCheckUser(jwt);
    if(res && !('error' in res)) {
      defaultProps.defaultUser = res;
      defaultProps.defaultLoggedIn = true;
    }
  }

  return (
    <html lang='en'>
      <head>
        <title>DrawHome - Online 3D Floor Plan & House Design Tool | Fast & Easy Home Design Software</title>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/metadata/favicon-32x32.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/metadata/favicon-16x16.ico' />
        <link rel='manifest' href='/metadata/site.webmanifest' />
        <link rel='mask-icon' href='/metadata/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#fff' />
        <script
          dangerouslySetInnerHTML={{
            __html: trimMultiline`
              (function(h,o,t,j,a,r) {
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5101503,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body style={{ fontFamily: SofiaPro }}>
        <StyledComponentsRegistry>
          <StylesReset />
          <AuthContextWrapper {...defaultProps}>
            {children}
          </AuthContextWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}) satisfies React.FCWithChildren;
