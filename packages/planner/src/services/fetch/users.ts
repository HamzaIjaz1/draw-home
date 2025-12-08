import { ChangeEmailRouteResponse, ChangeNameRouteResponse, ChangePasswordRouteResponse, DeleteAccountRouteResponse, UpdateAvatarRouteResponse, User } from '@draw-house/common/dist/zod';
import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';

export const getMe = async (): Promise<User> => {
  const res = await fetchHelper.get(apiUrls.user.me);

  return User.parse(res);
};

export const changePassword = async ({ currentPassword, password, passwordConfirmation }: {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}): Promise<true | string> => {
  const res = await fetchHelper.post(apiUrls.user.changePassword, {
    currentPassword,
    password,
    passwordConfirmation,
  });

  const { success, data, error } = ChangePasswordRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|cgq1du|', error.issues);
    throw error;
  }

  return 'user' in data ? true : data.error.message;
};

export const changeName = async (fullName: string) => {
  const res = await fetchHelper.post(apiUrls.user.changeName, {
    fullName,
  });

  const { success, data, error } = ChangeNameRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|h62gfo|', error.issues);
    throw error;
  }

  return (
    'error' in data
      ? { ok: false, error: data.error.message } as const
      : { ok: true } as const
  );
};

export const changeEmail = async ({ newEmail, password }: {
  newEmail: string;
  password: string;
}) => {
  const res = await fetchHelper.post(apiUrls.user.changeEmail, {
    newEmail,
    password,
  });

  const { success, data, error } = ChangeEmailRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|0i06ue|', error.issues);
    throw error;
  }

  return 'sent' in data
    ? { ok: true } as const
    : { ok: false, error: data.error } as const;
};

export const deleteAccount = async ({ password }: { password: string }) => {
  const res = await fetchHelper.post(apiUrls.user.deleteAccount, {
    password,
  });

  const { success, data, error } = DeleteAccountRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|v66hvf|', error.issues);
    throw error;
  }

  return (
    'ok' in data
      ? { ok: true } as const
      : { ok: false, error: data.error } as const
  );
};

export const updateAvatar = async (image: File) => {
  const formData = new FormData();

  formData.set('files.avatar', image);
  formData.set('data', JSON.stringify({}));

  const res = await fetchHelper.postFormData(apiUrls.user.updateAvatar, formData);

  const { success, data, error } = UpdateAvatarRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|r3k9gl|', error.issues);
    throw error;
  }

  return (
    'error' in data
      ? { ok: false, error: data.error.message } as const
      : { ok: true } as const
  );
};
