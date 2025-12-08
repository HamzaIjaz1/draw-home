'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SuspenseHOC } from '../../../../../components/SuspenseHOC';
import { broadCastChannelName, OAuthMessage } from '../../../../../components/Sign';

export default SuspenseHOC(() => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if(!searchParams) {
      return;
    }

    const location = searchParams.toString();

    const message: OAuthMessage = { strapiOauthLocation: location, source: 'strapi-oauth-window' };

    const broadcastChannel = new BroadcastChannel(broadCastChannelName);
    broadcastChannel.postMessage(message);
    // window.opener.postMessage(message);
    window.close();
  }, [searchParams]);

  return (
    <div>
      Authorizing...
    </div>
  );
});
