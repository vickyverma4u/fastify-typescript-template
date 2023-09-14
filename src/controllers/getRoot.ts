import { FastifyRequestTypebox, FastifyReplyTypebox, RouteShorthandOptionsWithHandlerTypebox } from '../types';
import { Type } from '@fastify/type-provider-typebox';

const getRootSchema = {
  querystring: Type.Object({
    name: Type.Optional(Type.String()),
  }),
  response: {
    200: Type.Object({
      msg: Type.String(),
    }),
  },
};

export const getRoot: RouteShorthandOptionsWithHandlerTypebox<typeof getRootSchema> = {
  schema: getRootSchema,
  handler: async (
    req: FastifyRequestTypebox<typeof getRootSchema>,
    reply: FastifyReplyTypebox<typeof getRootSchema>,
  ) => {
    reply.code(200).send({ msg: `Hello ${req.query.name ?? 'world'}!` });
  },
};
