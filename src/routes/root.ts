import { FastifyPluginAsync } from 'fastify';
import { getRoot } from '../controllers/getRoot';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', getRoot);
};

export default root;
