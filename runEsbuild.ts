import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';

build({
  entryPoints: ['./src/startServer.ts'],
  bundle: true,
  platform: 'node',
  outdir: './dist',
  loader: {
    '.xml': 'file',
  },
  minify: true,
  plugins: [
    {
      name: 'handle-xml',
      setup(build) {
        const xmlRegex = /\.xml$/;
        const namespace = `_${Math.random().toString(36).slice(2, 9)}`;
        const alias = Object.entries(build.initialOptions.alias ?? {});

        build.onResolve({ filter: xmlRegex }, async (args) => {
          const inputPath = alias.reduce((path, [key, val]) => {
            return path.replace(key, val);
          }, args.path);

          let filePath = path.resolve(args.resolveDir, inputPath);
          try {
            await access(filePath);
          } catch {
            filePath = path.resolve(
              args.resolveDir,
              inputPath.replace(xmlRegex, ''),
            );
          }

          return {
            path: filePath,
            namespace,
          };
        });

        build.onLoad({ filter: /.*/, namespace }, async (args) => {
          const contents = await readFile(args.path, 'utf8');

          return {
            contents,
            watchFiles: [args.path],
            loader: 'text',
          };
        });
      },
    },
    esbuildPluginPino({ transports: ['pino-pretty'] }),
  ],
}).catch((error) => console.error(error));
