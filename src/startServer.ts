import { createServer } from './createServer';

const server = createServer();

server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
