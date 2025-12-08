import assert from 'assert';
import { z, ZodError } from 'zod/v4';

const Envs = z.object({
  WITH_REACT_SCAN: z.enum(['true', 'false']).default('false'),
  NODEMAILER_USER: z.email(),
  NODEMAILER_PASS: z.string(),
  NODEMAILER_RECEIVER: z.email(),
});
type Envs = z.infer<typeof Envs>;

let envs: Envs;

try {
  // eslint-disable-next-line no-process-env
  envs = Envs.parse(process.env);
} catch(e) {
  assert(e instanceof ZodError, 'This should never happen. |81x6rn|');

  console.error('Zod issues:', e.issues);
  throw e;
}

export const WITH_REACT_SCAN = Envs.shape.WITH_REACT_SCAN.transform(e => e === 'true').parse(envs.WITH_REACT_SCAN);
export const NODEMAILER_USER = envs.NODEMAILER_USER;
export const NODEMAILER_PASS = envs.NODEMAILER_PASS;
export const NODEMAILER_RECEIVER = envs.NODEMAILER_RECEIVER;
