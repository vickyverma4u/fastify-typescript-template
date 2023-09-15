import { RouteShorthandOptionsWithHandlerTypebox } from '../../types';
import { Type } from '@fastify/type-provider-typebox';
import { createUser } from '../../services/fileDb';
import { signToken } from '../../utils/jwt';

const registerSchema = {
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

export const register: RouteShorthandOptionsWithHandlerTypebox<typeof registerSchema> = {
  schema: registerSchema,
  handler: async (req, reply) => {
    try {
      const user = await createUser(req.body.email, req.body.password);
      const token = signToken({ userId: user.userId, email: user.email, role: user.role });
      reply.code(200).send({ token });
    } catch (e: any) {
      reply.code(400).send({ error: 'Registration Failed' });
    }
  },
};
