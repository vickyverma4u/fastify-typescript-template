import config from 'config';
import fastify from 'fastify';

const fastifyLogger = fastify({
  logger: {
    level: config.get<string>('logLevel'),
  },
});

export const logger = fastifyLogger.log;
