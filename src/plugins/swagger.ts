import fp from 'fastify-plugin';
import fastifySwagger = require('@fastify/swagger');
import fastifySwaggerUi = require('@fastify/swagger-ui');

export default fp(async (fastify, _opts) => {
  if (process.env.NODE_ENV !== 'production') {
    fastify.register(fastifySwagger, {
      swagger: {
        info: {
          title: 'paraphraser-docs',
          version: '1.0.0',
        },
      },
    });

    fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (_request, _reply, next) {
          next();
        },
        preHandler: function (_request, _reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: header => header,
      transformSpecification: swaggerObject => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });
  }
});
