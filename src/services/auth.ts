import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';

import { signToken, verifyToken, TokenPayload } from '../utils/jwt';

export function authenticate(req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) {
  if (req.headers && typeof req.headers.authorization === 'string') {
    const token = req.headers.authorization.split(' ')?.[1] ?? '';

    try {
      const payload = verifyToken(token);
      req.userId = payload.userId;
      req.email = payload.email;
      req.role = payload.role;

      done();
    } catch (e) {
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  }
  return reply.code(401).send({ message: 'Unauthorized' });
}

export const authorize =
  (roles: string[]) => (req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    if (req.role && roles.includes(req.role)) {
      done();
    } else {
      return reply.code(403).send({ message: 'Forbidden' });
    }
  };

export const signAccessToken = (payload: TokenPayload) => {
  return signToken(payload);
};
