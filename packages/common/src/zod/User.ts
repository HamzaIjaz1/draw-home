import { z, ZodRawShape } from 'zod/v4';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { PaymentPlanAttributes } from './PaymentPlanAttributes';
import { strapiAbsoluteUrl } from './strapiMedia';
import { dateOrDateLike } from './common';

const mediaImageProps = {
  url: strapiAbsoluteUrl,
} satisfies ZodRawShape;

export const User = (
  z
    .object({
      username: z.string(),
      email: z.email(),
      fullName: z.string().nullable(),
      avatarExternal: z.string().nullable(),
      avatar: z.object({
        ...mediaImageProps,
        formats: z.object({
          medium: z.object(mediaImageProps).optional(),
        }).nullable(),
      }).nullable(),
      provider: z.enum(['local', 'google']),
      paymentPlan: PaymentPlanAttributes.nullable(),
      isAdmin: z.boolean().default(false),
      bypassPaywall: z.boolean().default(false),
      stripeCancelAtPeriodEnd: z.boolean().nullable().transform(e => e === true),
      stripeSubscribedFrom: dateOrDateLike.nullable(),
      stripeSubscribedTo: dateOrDateLike.nullable(),
    })
    .transform(({ avatar, ...rest }) => ({
      ...rest,
      avatar: isNull(avatar) ? null : (
        !isNull(avatar.formats) && !isUndefined(avatar.formats.medium)
          ? avatar.formats.medium.url
          : avatar.url
      ),
    }))
);

export type User = z.infer<typeof User>;

export const ChangePasswordRouteResponse = z.union([
  z.object({
    user: User,
  }),
  z.object({
    error: z.object({
      message: z.string(),
    }),
  }),
]);

export const ChangeEmailRouteResponse = z.union([
  z.object({
    sent: z.literal(true),
  }),
  z.object({
    error: z.object({
      message: z.string(),
      details: z.object({
        formField: z.enum(['password', 'newEmail']).optional(),
      }),
    }),
  }),
]);

export const DeleteAccountRouteResponse = z.union([
  z.object({
    ok: z.literal(true),
  }),
  z.object({
    error: z.object({
      message: z.string(),
      details: z.object({
        formField: z.enum(['password']).optional(),
      }),
    }),
  }),
]);

export const UpdateAvatarRouteResponse = z.union([
  z.object({
    data: z.literal('success'),
  }),
  z.object({
    data: z.null(),
    error: z.object({
      message: z.string(),
    }),
  }),
]);

export const ChangeNameRouteResponse = z.union([
  z.object({
    data: z.literal('success'),
  }),
  z.object({
    data: z.null(),
    error: z.object({
      message: z.string(),
    }),
  }),
]);
