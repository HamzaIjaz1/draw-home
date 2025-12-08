import { API_URL, STRAPI_API_KEY } from '@draw-house/common/dist/envVariables/public';
import { z } from 'zod/v4';
import { isProjectId, ProjectId } from '@draw-house/common/dist/brands';
import { isUndefined } from '@arthurka/ts-utils';
import { strapiJwtCookieName, tempProjectQueryParam } from '@draw-house/common/dist/constants';
import { type Resp as CheckUserResp, url } from './checkUser';
import { strapiErrorSchema } from './common';

export const fetchHelper = <T>(url: string): Promise<T | void> => (
  fetch(`${API_URL}${url}`, {
    credentials: 'include',
  })
    .then(e => e.json<T>())
    .catch(err => {
      console.error('Fetch from landing error |2wi0ec|', err);
    })
);

export const serverCheckUser = (jwtValue: string): Promise<CheckUserResp | void> => fetch(`${API_URL}${url}`, {
  headers: {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
    Cookie: `${strapiJwtCookieName}=${jwtValue}`,
  },
})
  .then(e => e.json<CheckUserResp>())
  .catch(err => {
    console.error('Server side check user from landing error |3h20df|', err);
  });

const authUserSchema = z.object({
  user: z.object({
    email: z.string(),
  }),
});

const strapiLoginResponseSchema = z.union([
  strapiErrorSchema,
  authUserSchema,
]);

type StrapiApiResponseError = z.infer<typeof strapiErrorSchema>;

type LoginReturn = (
  | { ok: true }
  | { ok: false; message: string }
);

const handleLoginResponse = (response: unknown): LoginReturn => {
  const { success, data } = strapiLoginResponseSchema.safeParse(response);
  if(success === false) {
    return {
      ok: false,
      message: 'API returned unexpected response',
    };
  }

  if('error' in data) {
    const { message } = data.error.details.errors?.[0] ?? {};

    return {
      ok: false,
      message: isUndefined(message) ? data.error.message : message,
    };
  }

  return { ok: true };
};

type LoginArg = {
  email: string;
  password: string;
};

export const loginLocal = async ({ email, password }: LoginArg): Promise<LoginReturn> => {
  const res = await fetch(`${API_URL}/api/auth/local`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  })
    .then(res => res.json())
    .catch((error): StrapiApiResponseError => {
      const msg = error instanceof Error ? error.message : error;
      console.error(`${msg} |fi4519|`);

      return {
        error: {
          message: 'Failed to login',
          details: {},
        },
      };
    });

  return handleLoginResponse(res);
};

const registrationSuccessSchema = authUserSchema.extend({
  status: z.enum(['confirm-email', 'done']),
});

const strapiRegisterResponseSchema = z.union([
  strapiErrorSchema,
  registrationSuccessSchema,
]);

type RegisterReturn = (
  | { ok: true; data: z.infer<typeof registrationSuccessSchema> }
  | { ok: false; message: string }
);

const handleRegisterResponse = (response: unknown): RegisterReturn => {
  const { success, data } = strapiRegisterResponseSchema.safeParse(response);
  if(success === false) {
    return {
      ok: false,
      message: 'API returned unexpected response',
    };
  }

  if('error' in data) {
    const { message } = data.error.details.errors?.[0] ?? {};

    return {
      ok: false,
      message: isUndefined(message) ? data.error.message : message,
    };
  }

  return { ok: true, data };
};

type RegisterArg = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  tempProjectId: ProjectId | null;
};

export const registerLocal = async ({
  username,
  email,
  password,
  fullName,
  tempProjectId,
}: RegisterArg): Promise<RegisterReturn> => {
  const url = new URL(`${API_URL}/api/auth/local/register`);
  if(isProjectId(tempProjectId)) {
    url.searchParams.set(tempProjectQueryParam, tempProjectId);
  }

  const res = await fetch(url.href, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${STRAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, fullName }),
  })
    .then(res => res.json())
    .catch((error): StrapiApiResponseError => {
      const msg = error instanceof Error ? error.message : error;
      console.error(`${msg} |txu2k3|`);

      return {
        error: {
          message: 'Failed to register',
          details: {},
        },
      };
    });

  return handleRegisterResponse(res);
};

export const copyProjectToMe = async (projectId: ProjectId) => {
  await fetch(`${API_URL}/api/projects/${projectId}/copy`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
  });
};
