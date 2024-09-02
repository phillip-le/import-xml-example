import Fastify from 'fastify';
import rssText from './resources/rss.xml';

export const createServer = () => {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  server.get('/', (_, reply) => {
    reply.type('application/xml').send(rssText);
  });

  return server;
};
