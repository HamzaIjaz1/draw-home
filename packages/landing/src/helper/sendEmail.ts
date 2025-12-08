import { NODEMAILER_PASS, NODEMAILER_USER } from '@draw-house/common/dist/envVariables/private';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async (options: Mail.Options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    });

    await transporter.sendMail(options);

    return { ok: true };
  } catch(error) {
    console.error('sendEmail |2q777s|', error);
    return { ok: false };
  }
};
