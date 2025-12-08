import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { API_DISCOURSE_SSO_URL, API_URL, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { tempProjectQueryParam } from '@draw-house/common/dist/constants';
import { isNull } from '@arthurka/ts-utils';
import { isProjectId, ProjectId } from '@draw-house/common/dist/brands';
import { ImageWrapper, Layout, LeftColumn, RightColumn, UnderImageText, Wrapper } from './styles';
import InformationBlock, { CloseButton } from './InformationBlock';
import { LoginSubmit, RegisterSubmit, useSign } from './useSign';
import { popupCenter } from '../../utils';
import { copyProjectToMe, fetchHelper, FinishOAuth, loginLocal, registerLocal } from '../../services';
import { AuthContext } from '../AuthContext';

const POPUP_URL = `${API_URL}/api/connect`;
const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 500;

const imageHouseWithoutBackground = '/imageHouseWithoutBackground.png';

export type OAuthMessage = { strapiOauthLocation: string; source: 'strapi-oauth-window' };
export const broadCastChannelName = 'auth-channel';

const getTempProjectId = (): ProjectId | null => {
  const searchParams = new URLSearchParams(window.location.search);
  const projectId = searchParams.get(tempProjectQueryParam);

  if(isProjectId(projectId)) {
    return projectId;
  }

  return null;
};

const saveTemporaryProject = async () => {
  const projectId = getTempProjectId();

  if(!isNull(projectId)) {
    await copyProjectToMe(projectId);
  }
};

type SignProps = {
  onCloseModal: () => void;
};
export const Sign: React.FC<SignProps> = ({ onCloseModal }) => {
  const searchParams = useSearchParams();

  const redirectAfterLogin = useCallback(() => {
    if(searchParams?.get('next') === 'community') {
      const url = new URL(API_DISCOURSE_SSO_URL);
      url.searchParams.set('sso', String(searchParams.get('sso')));
      url.searchParams.set('sig', String(searchParams.get('sig')));

      window.location.href = url.href;

      return;
    }

    window.location.href = PLANNER_URL;
  }, [searchParams]);

  const handleLogin: LoginSubmit = async ({ email, password }) => {
    const res = await loginLocal({ email, password });
    if(res.ok === false) {
      alert(res.message);
      return;
    }

    await saveTemporaryProject();
    redirectAfterLogin();
  };

  const handleRegister: RegisterSubmit = async ({ name, email, password }, resetForm) => {
    const projectId = getTempProjectId();

    const res = await registerLocal({
      username: email,
      email,
      password,
      fullName: name,
      tempProjectId: projectId,
    });

    if(res.ok === false) {
      alert(res.message);
      return;
    }

    resetForm();

    switch(res.data.status) {
      case 'confirm-email': {
        alert('Please check your email for a confirmation link to complete your registration');
        return;
      }
      case 'done': {
        window.location.href = PLANNER_URL;
        return;
      }
      default:
        ((e: never) => e)(res.data.status);
        throw new Error('This should never happen. |v1dny5|');
    }
  };

  const {
    type,
    formData,
    errors,
    onInputChange,
    onSubmit,
    toggleSignType,
    texts,
  } = useSign(handleLogin, handleRegister);

  const auth = useContext(AuthContext);
  const { push } = useRouter();

  const finishOauth = useCallback(async (e: MessageEvent<OAuthMessage>) => {
    const { strapiOauthLocation, source } = e.data;

    if(source !== 'strapi-oauth-window') {
      return;
    }

    if(!strapiOauthLocation) {
      console.error('Empty Strapi oauth location |950kws|');
      return;
    }

    const res = await fetchHelper<FinishOAuth.Resp>(FinishOAuth.url(strapiOauthLocation));

    if(!res) {
      alert('Sorry, there\'s some trouble with authentication');
      console.error('Strapi OAuth error |h3mu7x|', res);
      return;
    }

    if('error' in res) {
      alert(res.error.message);
      console.error('Strapi OAuth error |uj7o5r|', res);
      return;
    }

    auth.setVerified(true);
    auth.setUser(res.user);

    onCloseModal();
    await saveTemporaryProject();

    redirectAfterLogin();
  }, [auth, onCloseModal, redirectAfterLogin]);

  const broadcastChannel = useMemo(() => new BroadcastChannel(broadCastChannelName), []);

  const handleGoogleClick = () => {
    popupCenter({
      url: `${POPUP_URL}/google/`,
      title: 'Sign-in with Google',
      w: POPUP_WIDTH,
      h: POPUP_HEIGHT,
    });

    broadcastChannel.addEventListener('message', finishOauth);
  };

  useEffect(() => (
    () => {
      broadcastChannel.removeEventListener('message', finishOauth);
    }
  ), [finishOauth, broadcastChannel]);

  const handleContinueAsGuest = () => {
    push(String(PLANNER_URL));
  };

  return (
    <Layout>
      <Wrapper>
        <LeftColumn $isFlipped={type === 'login'}>
          <InformationBlock
            errors={errors}
            formData={formData}
            onChangeTypeOfSign={toggleSignType}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            texts={texts}
            type='register'
            face
            withAllowingTab={type === 'register'}
            onGoogleClick={handleGoogleClick}
            onCloseModal={onCloseModal}
            onContinueAsGuest={handleContinueAsGuest}
          />
          <InformationBlock
            errors={errors}
            formData={formData}
            onChangeTypeOfSign={toggleSignType}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            texts={texts}
            type='login'
            withAllowingTab={type === 'login'}
            onGoogleClick={handleGoogleClick}
            onCloseModal={onCloseModal}
            onContinueAsGuest={handleContinueAsGuest}
          />
        </LeftColumn>

        <RightColumn>
          <ImageWrapper>
            <Image src={imageHouseWithoutBackground} alt='Home image' width={625} height={334} />
          </ImageWrapper>
          <UnderImageText>
            Design Your Perfect House
          </UnderImageText>
        </RightColumn>
      </Wrapper>
      <CloseButton onClick={onCloseModal} />
    </Layout>
  );
};
