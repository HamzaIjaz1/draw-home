import { NextApiRequest, NextApiResponse } from 'next';
import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { NODEMAILER_RECEIVER } from '@draw-house/common/dist/envVariables/private';
import { sendEmail } from '../../helper';

const cors = (res: NextApiResponse): void => {
  res.setHeader('Access-Control-Allow-Origin', PLANNER_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(res);

  if(req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if(req.method === 'POST') {
    const { name, email, phone, subject, comment } = req.body;

    const { ok } = await sendEmail({
      from: email,
      to: NODEMAILER_RECEIVER,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nComment: ${comment}`,
    });

    if(ok === false) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
