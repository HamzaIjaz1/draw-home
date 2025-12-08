import { STRAPI_API_KEY } from '@draw-house/common/dist/envVariables/public';

export const fetchHelper = {
  get(url: string) {
    return fetch(url, {
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    }).then(e => e.json());
  },
  post(url: string, body: Record<string, unknown>) {
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }).then(e => e.json());
  },
  postFormData(url: string, body: FormData) {
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      body,
    }).then(e => e.json());
  },
  delete(url: string) {
    return fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    }).then(e => e.json());
  },
  put(url: string, body: Record<string, unknown>) {
    return fetch(url, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }).then(e => e.json());
  },
};
