import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod/v4';
import { User } from '@draw-house/common/dist/zod';
import { strapiUsersMeEndpointWithPopulate } from '@draw-house/common/dist/constants';
import { API_URL, PLANNER_URL, STRAPI_API_KEY } from '@draw-house/common/dist/envVariables/public';
import { NODEMAILER_RECEIVER } from '@draw-house/common/dist/envVariables/private';
import { isNull, isUndefined, trimMultiline } from '@arthurka/ts-utils';
import { sendEmail } from '../../helper';

const bodySchema = z.object({
  subject: z.string().min(1),
  comment: z.string().min(1),
});

const cors = (res: NextApiResponse): void => {
  res.setHeader('Access-Control-Allow-Origin', PLANNER_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

const authenticate = async (cookies: string): Promise<null | User> => {
  try {
    const authResp = await fetch(`${API_URL}${strapiUsersMeEndpointWithPopulate}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
        Cookie: cookies,
      },
    }).then(e => e.json());

    const user = User.parse(authResp);

    return user;
  } catch(error) {
    console.error('user-support |exw20p|', error);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(res);

  if(req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if(req.method === 'POST') {
    const cookies = req.headers.cookie;
    if(isUndefined(cookies)) {
      return res.status(403).send({ error: 'Forbidden' });
    }

    const user = await authenticate(cookies);
    if(isNull(user)) {
      return res.status(403).send({ error: 'Forbidden' });
    }

    const { success, error, data } = bodySchema.safeParse(req.body);
    if(success === false) {
      return res.status(400).send({
        error: 'Bad request',
        message: z.prettifyError(error),
      });
    }

    const { subject, comment } = data;

    const { ok } = await sendEmail({
      from: user.email,
      to: NODEMAILER_RECEIVER,
      subject,
      text: trimMultiline`
        <logged-in user>

        Name: ${user.fullName}
        Email: ${user.email}
        Comment: ${comment}
      `,
    });

    if(ok === false) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
