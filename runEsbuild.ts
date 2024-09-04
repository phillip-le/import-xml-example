import { build } from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';

build({
  entryPoints: ['./src/startServer.ts'],
  bundle: true,
  platform: 'node',
  outdir: './dist',
  minify: true,
  loader: {
    '.xml': 'text',
  },
  plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })],
}).catch((error) => console.error(error));
