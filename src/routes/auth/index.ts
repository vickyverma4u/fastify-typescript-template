import { FastifyPluginAsync } from 'fastify';
import { register } from '../../controllers/auth/register';
import { login } from '../../controllers/auth/login';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/register', register);
  fastify.post('/login', login);
};

export default auth;
