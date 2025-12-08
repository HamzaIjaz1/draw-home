import { User } from '@draw-house/common/dist/zod';
import { assign, createActor, fromPromise, setup } from 'xstate';
import { create } from 'zustand';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { getMe } from '../services';

type Store = {
  user: null | 'guest' | User;
};

const stateMachine = setup({
  types: {
    context: {} as {
      user?: User;
    },
    events: {} as { type: 'to requestToLoadUser' | 'to guest' },
  },
  actors: {
    loadUser: fromPromise(getMe),
  },
}).createMachine({
  initial: 'requestToLoadUser',
  states: {
    requestToLoadUser: {
      invoke: {
        src: 'loadUser',
        onDone: {
          target: 'loggedUser',
          actions: assign({
            user: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'guest',
          actions({ event }) {
            console.error('User is probably a guest. |pt21fz|', event.error);
          },
        },
      },
    },
    loggedUser: {
      on: {
        'to guest': {
          target: 'guest',
        },
      },
    },
    guest: {
      on: {
        'to requestToLoadUser': {
          target: 'requestToLoadUser',
        },
      },
    },
  },
});

const actor = createActor(stateMachine).start();

export const useUser = create<Store>(set => {
  actor.subscribe(({ value, context }) => {
    switch(value) {
      case 'guest':
        set({ user: 'guest' });
        break;
      case 'loggedUser':
        set({
          user: getNotUndefined(context.user, 'Something went wrong. |3gmw5x|'),
        });
        break;
      case 'requestToLoadUser':
        break;
      default:
        ((e: never) => e)(value);
        throw new Error('This should never happen. |4f25so|');
    }
  });

  return {
    user: null,
  };
});

export const sendUserAction = (type: Parameters<typeof actor.send>[0]['type']) => (
  actor.send({ type })
);

export const useUserResolved = () => {
  const { user } = useUser();
  assert(!isNull(user), 'Something went wrong. |s6ml4z|');

  return { user };
};
useUserResolved.getState = () => {
  const { user } = useUser.getState();
  assert(!isNull(user), 'Something went wrong. |zm21tz|');

  return { user };
};
