import { FastifyRequestTypebox, FastifyReplyTypebox, RouteShorthandOptionsWithHandlerTypebox } from '../../types';
import { Type } from '@fastify/type-provider-typebox';
import { getUserByEmail } from '../../services/fileDb';
import { verifyPassword } from '../../utils/password';
import { signToken } from '../../utils/jwt';

const loginSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }),
  response: {
    200: Type.Object({
      token: Type.String(),
    }),
    400: Type.Object({
      error: Type.String(),
    }),
  },
};

export const login: RouteShorthandOptionsWithHandlerTypebox<typeof loginSchema> = {
  schema: loginSchema,
  handler: async (req: FastifyRequestTypebox<typeof loginSchema>, reply: FastifyReplyTypebox<typeof loginSchema>) => {
    try {
      const user = getUserByEmail(req.body.email);
      if (!user) return reply.code(400).send({ error: 'User not found' });
      if (await verifyPassword(req.body.password, user.password)) {
        const token = signToken({ userId: user.userId, email: user.email, role: user.role });
        return reply.code(200).send({ token });
      }
    } catch (e: any) {
      reply.code(400).send({ error: 'Login Failed' });
    }
  },
};
