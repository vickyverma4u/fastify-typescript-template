import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
  fastify.decorateRequest('userId', -1);
  fastify.decorateRequest('email', '');
  fastify.decorateRequest('role', '');
});

declare module 'fastify' {
  export interface FastifyRequest {
    userId: number;
    email: string;
    role: string;
  }
}
